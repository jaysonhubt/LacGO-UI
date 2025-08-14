<template>
  <!-- Gradient Header -->
  <div class="gradient-header">
    <v-app-bar color="transparent" dark flat>

      <v-spacer />
      <v-btn icon variant="text" class="notification-btn">
        <v-badge color="error" dot>
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Welcome Section -->
    <div class="welcome-section">
      <div class="welcome-text">
        <h1 class="text-h4 font-weight-bold text-white mb-2">
          Xin chào, {{ authStore.user?.name || 'Bạn' }}! 👋
        </h1>
        <p class="text-h6 text-white opacity-90">Đặt xe nhanh chóng</p>
      </div>
    </div>
  </div>

  <div class="content-wrapper">
    <!-- Booking Form -->
    <v-card class="booking-card" elevation="8" rounded="xl">
      <v-card-text class="pa-6">
        <div class="booking-header mb-4">
          <h3 class="text-h6 font-weight-bold text-primary">🚗 Đặt xe ngay</h3>
        </div>


        <div class="location-area">
          <div class="location-inputs">
            <div class="location-from mb-4">
              <v-text-field
                  v-model="bookingForm.from"
                  label="Điểm đón"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker-circle"
                  placeholder="Nhập địa điểm đón"
                  color="primary"
                  class="location-input"
                  clearable
              >
                <template v-slot:prepend-inner>
                  <v-icon color="success">mdi-circle</v-icon>
                </template>
              </v-text-field>
            </div>

            <div class="location-to mb-4">
              <v-text-field
                  v-model="bookingForm.to"
                  label="Điểm đến"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="Nhập điểm đến"
                  color="primary"
                  class="location-input"
                  clearable
              >
                <template v-slot:prepend-inner>
                  <v-icon color="error">mdi-map-marker</v-icon>
                </template>
              </v-text-field>
            </div>
          </div>

          <div class="swap-location">
            <div class="swap-button-container">
              <v-btn
                  icon
                  size="small"
                  color="primary"
                  class="swap-btn"
                  @click="swapLocations"
              >
                <v-icon>mdi-swap-vertical</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="datetime-area">
          <!-- Date and Time Selection -->
          <v-row class="mb-4">
            <v-col cols="6">
              <v-text-field
                  v-model="bookingForm.date"
                  label="Ngày đi"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  @click="dateDialog = true"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                  v-model="bookingForm.time"
                  label="Giờ đi"
                  variant="outlined"
                  prepend-inner-icon="mdi-clock-outline"
                  readonly
                  @click="timeDialog = true"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions mb-4">
          <v-chip-group v-model="selectedQuickAction" color="primary" class="mb-3">
            <v-chip filter variant="outlined" value="now">
              <v-icon start>mdi-lightning-bolt</v-icon>
              Đi ngay
            </v-chip>
            <v-chip filter variant="outlined" value="schedule">
              <v-icon start>mdi-calendar-clock</v-icon>
              Đặt lịch
            </v-chip>
            <v-chip filter variant="outlined" value="vip">
              <v-icon start>mdi-crown</v-icon>
              Xe VIP
            </v-chip>
          </v-chip-group>
        </div>

        <v-btn
            color="primary"
            size="large"
            block
            class="search-btn"
            rounded="xl"
            elevation="4"
            @click="searchVehicles"
        >
          <v-icon start>mdi-magnify</v-icon>
          Tìm xe phù hợp
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Service Types -->
    <div class="service-section mt-6">
      <h3 class="text-h6 font-weight-bold mb-4">🚙 Loại xe</h3>
      <v-row>
        <v-col cols="6" v-for="service in services" :key="service.name">
          <v-card
              class="service-card text-center"
              elevation="2"
              rounded="xl"
              @click="selectService(service)"
              :class="{ 'service-selected': selectedService === service.name }"
          >
            <v-card-text class="pa-4">
              <div class="service-icon-wrapper mb-2">
                <v-icon :color="service.color" size="32">
                  {{ service.icon }}
                </v-icon>
              </div>
              <div class="text-subtitle-2 font-weight-bold">
                {{ service.name }}
              </div>
              <div class="text-caption text-medium-emphasis">
                {{ service.description }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Recent Locations -->
    <v-card class="recent-card mt-6" elevation="3" rounded="xl">
      <v-card-title class="text-h6 font-weight-bold">
        <v-icon start color="primary">mdi-history</v-icon>
        Địa điểm gần đây
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list>
          <v-list-item
              v-for="location in recentLocations"
              :key="location.id"
              :title="location.name"
              :subtitle="location.address"
              @click="selectLocation(location)"
              class="recent-location-item"
          >
            <template v-slot:prepend>
              <v-avatar :color="location.color" size="40">
                <v-icon color="white">{{ location.icon }}</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn icon variant="text" size="small">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>

  <!-- Date Picker Dialog -->
  <v-dialog v-model="dateDialog" max-width="400px">
    <v-card rounded="xl">
      <v-card-title>Chọn ngày đi</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="selectedDate"
            type="date"
            label="Ngày đi"
            variant="outlined"
            :min="new Date().toISOString().substr(0, 10)"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dateDialog = false">Hủy</v-btn>
        <v-btn color="primary" @click="setDate">Chọn</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Time Picker Dialog -->
  <v-dialog v-model="timeDialog" max-width="400px">
    <v-card rounded="xl">
      <v-card-title>Chọn giờ đi</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="selectedTime"
            type="time"
            label="Giờ đi"
            variant="outlined"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="timeDialog = false">Hủy</v-btn>
        <v-btn color="primary" @click="setTime">Chọn</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogoComponent from '@/components/LogoComponent.vue'

const authStore = useAuthStore()

// Form data
const bookingForm = ref({
  from: '',
  to: '',
  date: '',
  time: ''
})

const selectedService = ref('')
const selectedQuickAction = ref('')
const dateDialog = ref(false)
const timeDialog = ref(false)
const selectedDate = ref('')
const selectedTime = ref('')

// Updated services for inter-provincial car booking
const services = ref([
  { 
    name: 'Xe 4 chỗ', 
    icon: 'mdi-car-side', 
    color: 'primary',
    description: 'Sedan, SUV nhỏ'
  },
  { 
    name: 'Xe 7 chỗ', 
    icon: 'mdi-van-passenger', 
    color: 'success',
    description: 'MPV, SUV lớn'
  }
])

// Updated recent locations for inter-provincial travel
const recentLocations = ref([
  { 
    id: 1, 
    name: 'TP. Hồ Chí Minh', 
    address: 'Thành phố Hồ Chí Minh', 
    icon: 'mdi-city', 
    color: 'primary' 
  },
  { 
    id: 2, 
    name: 'Hà Nội', 
    address: 'Thủ đô Hà Nội', 
    icon: 'mdi-city-variant', 
    color: 'red' 
  },
  { 
    id: 3, 
    name: 'Đà Nẵng', 
    address: 'Thành phố Đà Nẵng', 
    icon: 'mdi-beach', 
    color: 'blue' 
  },
  { 
    id: 4, 
    name: 'Nha Trang', 
    address: 'Khánh Hòa', 
    icon: 'mdi-waves', 
    color: 'cyan' 
  },
  { 
    id: 5, 
    name: 'Đà Lạt', 
    address: 'Lâm Đồng', 
    icon: 'mdi-pine-tree', 
    color: 'green' 
  }
])

const selectService = (service: any) => {
  selectedService.value = service.name
  console.log('Selected service:', service.name)
}

const selectLocation = (location: any) => {
  if (!bookingForm.value.from) {
    bookingForm.value.from = location.name
  } else if (!bookingForm.value.to) {
    bookingForm.value.to = location.name
  }
  console.log('Selected location:', location.name)
}

const swapLocations = () => {
  const temp = bookingForm.value.from
  bookingForm.value.from = bookingForm.value.to
  bookingForm.value.to = temp
}

const setDate = () => {
  bookingForm.value.date = selectedDate.value
  dateDialog.value = false
}

const setTime = () => {
  bookingForm.value.time = selectedTime.value
  timeDialog.value = false
}

const searchVehicles = () => {
  if (!bookingForm.value.from || !bookingForm.value.to) {
    alert('Vui lòng nhập điểm đón và điểm đến')
    return
  }
  console.log('Searching vehicles with:', bookingForm.value)
  // Navigate to vehicle list or search results
}
</script>

<style scoped>

/* Gradient Header */
.gradient-header {
  background: linear-gradient(45deg, #30792d 0%, #96d96e 100%);
  padding-bottom: 40px;
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

.welcome-section {
  padding: 60px 20px 20px;
  position: relative;
  z-index: 1;
}

.welcome-text {
  text-align: center;
}

.notification-btn {
  position: relative;
  z-index: 2;
}

/* Content Wrapper */
.content-wrapper {
  padding: 20px;
  margin-top: -20px;
  position: relative;
  z-index: 2;
}

/* Booking Card */
.booking-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.location-area {
  display: flex;
}
.location-inputs {
  position: relative;
  width: calc(100% - 40px);
}

.swap-location {
  width: 40px;
  position: relative;
}

.swap-btn {
  color: white;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.datetime-area {
  width: calc(100% - 40px);
}

.search-btn {
  color: white;
  font-weight: bold;
}

/* Service Cards */
.service-card {
  cursor: pointer;
  background: linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%);
  border: 2px solid transparent;
}

.service-selected {
  border-color: #667eea;
  background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.service-selected .text-medium-emphasis {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Recent Locations */
.recent-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.recent-location-item {
  border-radius: 12px;
  margin: 4px 8px;
}

/* Quick Actions */
.quick-actions .v-chip--selected {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Dialog Styling */
.v-dialog .v-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .content-wrapper {
    padding: 16px;
    margin-top: -16px;
  }
  
  .welcome-section {
    padding: 40px 16px 16px;
  }
  
  .welcome-text h1 {
    font-size: 1.5rem;
  }
  
  .welcome-text p {
    font-size: 1rem;
  }
  
  .service-card {
    margin-bottom: 12px;
  }
}

</style>
