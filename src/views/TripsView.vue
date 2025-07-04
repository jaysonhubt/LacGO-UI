<template>
  <v-container fluid class="trips-container">
    <!-- Gradient Header -->
    <div class="gradient-header">
      <v-app-bar color="transparent" dark flat>
        <v-app-bar-title class="text-h5 font-weight-bold">
          <v-icon class="mr-2">mdi-road-variant</v-icon>
          Chuyến đi
        </v-app-bar-title>
        <v-spacer />
        <v-btn icon variant="text">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <v-btn icon variant="text">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    
    <div class="content-wrapper">
      <!-- Custom Tabs -->
      <div class="custom-tabs mb-6">
        <v-chip-group v-model="activeTab" mandatory color="primary" class="justify-center">
          <v-chip
            filter
            size="large" 
            value="recent"
            class="tab-chip"
            rounded="xl"
          >
            <v-icon start>mdi-clock-outline</v-icon>
            Gần đây
          </v-chip>
          <v-chip
            filter
            size="large"
            value="completed"
            class="tab-chip"
            rounded="xl"
          >
            <v-icon start>mdi-check-circle</v-icon>
            Hoàn thành
          </v-chip>
          <v-chip
            filter
            size="large"
            value="cancelled"
            class="tab-chip"
            rounded="xl"
          >
            <v-icon start>mdi-close-circle</v-icon>
            Đã hủy
          </v-chip>
        </v-chip-group>
      </div>
      
      <!-- Recent Trips -->
      <div v-if="activeTab === 'recent'">
        <div v-if="recentTrips.length === 0" class="empty-state">
          <div class="empty-icon-wrapper">
            <v-icon size="80" color="primary" class="empty-icon">mdi-car-outline</v-icon>
          </div>
          <h3 class="text-h5 font-weight-bold mb-2">Chưa có chuyến đi nào 🚗</h3>
          <p class="text-body-1 text-medium-emphasis mb-4">Hãy đặt xe để bắt đầu chuyến đi đầu tiên</p>
          <v-btn color="primary" size="large" rounded="xl" @click="$router.push('/')">
            <v-icon start>mdi-plus</v-icon>
            Đặt xe ngay
          </v-btn>
        </div>
        
        <div v-else class="trips-list">
          <v-card
            v-for="trip in recentTrips"
            :key="trip.id"
            class="trip-card mb-4"
            elevation="4"
            rounded="xl"
            @click="viewTripDetails(trip)"
          >
            <v-card-text class="pa-5">
              <!-- Trip Header -->
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="status-badge">
                  <v-chip
                    :color="trip.statusColor"
                    size="small"
                    class="gradient-chip"
                    variant="flat"
                  >
                    <v-icon start size="16">{{ trip.statusIcon }}</v-icon>
                    {{ trip.statusEmoji }} {{ trip.status }}
                  </v-chip>
                </div>
                <div class="trip-date">
                  <span class="text-caption text-medium-emphasis">{{ trip.date }}</span>
                </div>
              </div>
              
              <!-- Progress Indicator -->
              <div class="progress-section mb-4" v-if="trip.status !== 'Hoàn thành'">
                <v-progress-linear
                  :model-value="trip.progress"
                  :color="trip.statusColor"
                  height="8"
                  rounded
                  class="mb-2"
                />
                <div class="text-caption text-medium-emphasis text-center">
                  {{ trip.progressText }}
                </div>
              </div>
              
              <!-- Route Information -->
              <div class="trip-route mb-4">
                <div class="route-item d-flex align-center mb-3">
                  <div class="route-icon pickup">
                    <v-icon color="success" size="20">mdi-circle</v-icon>
                  </div>
                  <div class="route-text ml-3">
                    <div class="text-subtitle-2 font-weight-bold">Điểm đón</div>
                    <div class="text-body-2 text-medium-emphasis">{{ trip.pickup }}</div>
                  </div>
                </div>
                
                <div class="route-line"></div>
                
                <div class="route-item d-flex align-center">
                  <div class="route-icon destination">
                    <v-icon color="error" size="20">mdi-map-marker</v-icon>
                  </div>
                  <div class="route-text ml-3">
                    <div class="text-subtitle-2 font-weight-bold">Điểm đến</div>
                    <div class="text-body-2 text-medium-emphasis">{{ trip.destination }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Trip Details -->
              <div class="trip-details mb-4">
                <v-row>
                  <v-col cols="4">
                    <div class="detail-item">
                      <v-icon color="primary" size="16" class="mb-1">mdi-car</v-icon>
                      <div class="text-caption text-medium-emphasis">Loại xe</div>
                      <div class="text-subtitle-2 font-weight-bold">{{ trip.vehicleType }}</div>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="detail-item">
                      <v-icon color="orange" size="16" class="mb-1">mdi-clock</v-icon>
                      <div class="text-caption text-medium-emphasis">Thời gian</div>
                      <div class="text-subtitle-2 font-weight-bold">{{ trip.duration }}</div>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div class="detail-item">
                      <v-icon color="info" size="16" class="mb-1">mdi-map-marker-distance</v-icon>
                      <div class="text-caption text-medium-emphasis">Khoảng cách</div>
                      <div class="text-subtitle-2 font-weight-bold">{{ trip.distance }}</div>
                    </div>
                  </v-col>
                </v-row>
              </div>
              
              <!-- Driver Info -->
              <div class="driver-info mb-4" v-if="trip.driver">
                <div class="d-flex align-center">
                  <v-avatar size="40" class="gradient-avatar">
                    <v-img :src="trip.driver.avatar" />
                  </v-avatar>
                  <div class="ml-3 flex-grow-1">
                    <div class="text-subtitle-2 font-weight-bold">{{ trip.driver.name }}</div>
                    <div class="d-flex align-center">
                      <v-rating
                        :model-value="trip.driver.rating"
                        color="amber"
                        size="16"
                        readonly
                        density="compact"
                      />
                      <span class="text-caption ml-1">({{ trip.driver.rating }})</span>
                    </div>
                  </div>
                  <v-btn icon size="small" variant="text" color="primary">
                    <v-icon>mdi-phone</v-icon>
                  </v-btn>
                  <v-btn icon size="small" variant="text" color="info">
                    <v-icon>mdi-chat</v-icon>
                  </v-btn>
                </div>
              </div>
              
              <v-divider class="my-4" />
              
              <!-- Trip Footer -->
              <div class="d-flex justify-space-between align-center">
                <div class="trip-fare">
                  <div class="text-h5 font-weight-bold gradient-text">{{ trip.fare }}</div>
                  <div class="text-caption text-medium-emphasis">{{ trip.paymentMethod }}</div>
                </div>
                <div class="trip-actions">
                  <v-btn size="small" variant="outlined" color="primary" class="mr-2">
                    Chi tiết
                  </v-btn>
                  <v-btn 
                    v-if="trip.status === 'Đang đi'"
                    size="small" 
                    color="success"
                    @click.stop="trackTrip(trip)"
                  >
                    <v-icon start>mdi-map-marker-path</v-icon>
                    Theo dõi
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
      
      <!-- Completed Trips -->
      <div v-else-if="activeTab === 'completed'">
        <div class="empty-state">
          <div class="empty-icon-wrapper">
            <v-icon size="80" color="success" class="empty-icon">mdi-check-circle</v-icon>
          </div>
          <h3 class="text-h5 font-weight-bold mb-2">Chưa có chuyến đi hoàn thành ✅</h3>
          <p class="text-body-1 text-medium-emphasis">Các chuyến đi đã hoàn thành sẽ xuất hiện ở đây</p>
        </div>
      </div>
      
      <!-- Cancelled Trips -->
      <div v-else-if="activeTab === 'cancelled'">
        <div class="empty-state">
          <div class="empty-icon-wrapper">
            <v-icon size="80" color="error" class="empty-icon">mdi-close-circle</v-icon>
          </div>
          <h3 class="text-h5 font-weight-bold mb-2">Chưa có chuyến đi bị hủy ❌</h3>
          <p class="text-body-1 text-medium-emphasis">Chuyến đi bị hủy sẽ được hiển thị tại đây</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('recent')

const recentTrips = ref([
  {
    id: 1,
    pickup: 'TP. Hồ Chí Minh',
    destination: 'Đà Lạt, Lâm Đồng',
    date: '15/12/2024 - 08:30',
    status: 'Đang đi',
    statusColor: 'info',
    statusIcon: 'mdi-car',
    statusEmoji: '🚗',
    fare: '850.000đ',
    paymentMethod: 'Tiền mặt',
    vehicleType: 'Xe 4 chỗ',
    duration: '6h 30p',
    distance: '308 km',
    progress: 65,
    progressText: 'Đang trên đường - 65% hoàn thành',
    driver: {
      name: 'Anh Minh',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    id: 2,
    pickup: 'Hà Nội',
    destination: 'Hạ Long, Quảng Ninh',
    date: '12/12/2024 - 14:00',
    status: 'Hoàn thành',
    statusColor: 'success',
    statusIcon: 'mdi-check-circle',
    statusEmoji: '✅',
    fare: '650.000đ',
    paymentMethod: 'Chuyển khoản',
    vehicleType: 'Xe 7 chỗ',
    duration: '3h 45p',
    distance: '165 km',
    progress: 100,
    progressText: 'Đã hoàn thành',
    driver: {
      name: 'Chị Hương',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c2e19d5e?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    id: 3,
    pickup: 'Đà Nẵng',
    destination: 'Hội An, Quảng Nam',
    date: '10/12/2024 - 16:15',
    status: 'Chờ xác nhận',
    statusColor: 'warning',
    statusIcon: 'mdi-clock-outline',
    statusEmoji: '⏳',
    fare: '180.000đ',
    paymentMethod: 'Thẻ ngân hàng',
    vehicleType: 'Xe 4 chỗ',
    duration: '1h 15p',
    distance: '35 km',
    progress: 0,
    progressText: 'Đang tìm tài xế phù hợp',
    driver: null
  }
])

const viewTripDetails = (trip: any) => {
  console.log('Viewing trip details:', trip.id)
  // Navigate to trip detail view
}

const trackTrip = (trip: any) => {
  console.log('Tracking trip:', trip.id)
  // Open real-time tracking view
}
</script>

<style scoped>
.trips-container {
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

/* Gradient Header */
.gradient-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.gradient-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="40%"><stop offset="0%" stop-color="rgba(255,255,255,.1)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23a)"/></svg>');
  opacity: 0.3;
}

/* Content Wrapper */
.content-wrapper {
  padding: 20px;
  margin-top: -10px;
  position: relative;
  z-index: 2;
}

/* Custom Tabs */
.tab-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0 8px;
}

.v-chip--selected.tab-chip {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

.empty-icon-wrapper {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 50%;
  padding: 30px;
  margin-bottom: 20px;
}

.trip-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

/* Status Badge */
.gradient-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, var(--v-theme-primary) 0%, var(--v-theme-secondary) 100%);
}

/* Progress Section */
.progress-section {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

/* Route Information */
.trip-route {
  position: relative;
  padding: 16px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(244, 67, 54, 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.route-item {
  position: relative;
  z-index: 2;
}

.route-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.route-line {
  position: absolute;
  left: 47px;
  top: 45px;
  bottom: 45px;
  width: 2px;
  background: linear-gradient(to bottom, #4CAF50 0%, #F44336 100%);
  border-radius: 1px;
}

.route-text {
  flex: 1;
}

/* Trip Details */
.trip-details {
  background: rgba(102, 126, 234, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.detail-item {
  text-align: center;
}

/* Driver Info */
.driver-info {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 255, 0.8) 100%);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.gradient-avatar {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Trip Fare */
.gradient-text {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
}

/* Progress Linear */
.v-progress-linear {
  border-radius: 8px;
  overflow: hidden;
}

.v-progress-linear__determinate {
  background: linear-gradient(90deg, var(--v-theme-primary) 0%, var(--v-theme-secondary) 100%);
}

/* Responsive Design */
@media (max-width: 600px) {
  .content-wrapper {
    padding: 16px;
  }
  
  .trip-card .pa-5 {
    padding: 16px !important;
  }
  
  .custom-tabs .tab-chip {
    margin: 0 4px;
    font-size: 0.875rem;
  }
  
  .route-line {
    left: 31px;
  }
  
  .route-icon {
    width: 28px;
    height: 28px;
  }
  
  .gradient-avatar {
    width: 36px !important;
    height: 36px !important;
  }
}

/* Custom Scrollbar */
.trips-container::-webkit-scrollbar {
  width: 6px;
}

.trips-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.trips-container::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

/* Smooth Scrolling */
.trips-container {
  scroll-behavior: smooth;
}
</style>
