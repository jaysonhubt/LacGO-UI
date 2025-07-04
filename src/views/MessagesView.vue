<template>
  <v-container fluid class="messages-container">
    <!-- Gradient Header -->
    <div class="gradient-header">
      <v-app-bar color="transparent" dark flat>
        <v-app-bar-title class="text-h5 font-weight-bold">
          <v-icon class="mr-2">mdi-chat</v-icon>
          Tin nhắn
        </v-app-bar-title>
        <v-spacer />
        <v-btn icon variant="text">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon variant="text">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    
    <div class="content-wrapper">
      <div v-if="conversations.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <v-icon size="80" color="primary" class="empty-icon">mdi-chat-outline</v-icon>
        </div>
        <h3 class="text-h5 font-weight-bold mb-2">Chưa có cuộc trò chuyện</h3>
        <p class="text-body-1 text-medium-emphasis mb-4">Tin nhắn từ tài xế sẽ xuất hiện ở đây</p>
        <v-btn color="primary" variant="outlined" rounded="xl">
          <v-icon start>mdi-plus</v-icon>
          Bắt đầu trò chuyện
        </v-btn>
      </div>
      
      <!-- Conversations List -->
      <div v-else class="conversations-list">
        <v-card
          v-for="conversation in conversations"
          :key="conversation.id"
          class="conversation-card mb-3"
          elevation="2"
          rounded="xl"
          @click="openConversation(conversation)"
        >
          <v-card-text class="pa-4">
            <div class="d-flex align-center">
              <!-- Avatar with Online Status -->
              <div class="avatar-wrapper">
                <v-avatar size="56" class="gradient-avatar">
                  <v-img :src="conversation.avatar" />
                </v-avatar>
                <div 
                  class="online-status" 
                  :class="{ 'online': conversation.isOnline, 'offline': !conversation.isOnline }"
                ></div>
              </div>
              
              <!-- Message Content -->
              <div class="message-content flex-grow-1 ml-4">
                <div class="d-flex justify-space-between align-center mb-1">
                  <h4 class="text-subtitle-1 font-weight-bold">
                    {{ conversation.name }}
                    <v-chip
                      v-if="conversation.role === 'driver'"
                      size="x-small"
                      color="primary"
                      variant="flat"
                      class="ml-2"
                    >
                      <v-icon start size="12">mdi-car</v-icon>
                      Tài xế
                    </v-chip>
                    <v-chip
                      v-else
                      size="x-small"
                      color="info"
                      variant="flat"
                      class="ml-2"
                    >
                      <v-icon start size="12">mdi-headset</v-icon>
                      Hỗ trợ
                    </v-chip>
                  </h4>
                  <div class="message-time">
                    <span class="text-caption text-medium-emphasis">{{ conversation.time }}</span>
                    <v-icon 
                      v-if="conversation.readReceipt" 
                      :color="conversation.readReceipt === 'read' ? 'primary' : 'grey'"
                      size="16"
                      class="ml-1"
                    >
                      {{ conversation.readReceipt === 'read' ? 'mdi-check-all' : 'mdi-check' }}
                    </v-icon>
                  </div>
                </div>
                
                <div class="last-message d-flex align-center">
                  <p class="text-body-2 text-medium-emphasis mb-0 flex-grow-1">
                    {{ conversation.lastMessage }}
                  </p>
                  <v-badge
                    v-if="conversation.unreadCount > 0"
                    :content="conversation.unreadCount"
                    color="error"
                    class="ml-2"
                  >
                    <div></div>
                  </v-badge>
                </div>
              </div>
              
              <!-- Action Button -->
              <div class="action-buttons ml-3">
                <v-btn icon size="small" variant="text">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      
      <!-- Quick Actions -->
      <div class="quick-actions mt-6">
        <h4 class="text-h6 font-weight-bold mb-4">🚀 Hành động nhanh</h4>
        <v-row>
          <v-col cols="6">
            <v-card class="action-card" elevation="2" rounded="xl" @click="contactSupport">
              <v-card-text class="text-center pa-4">
                <v-icon color="info" size="32" class="mb-2">mdi-help-circle</v-icon>
                <div class="text-subtitle-2 font-weight-bold">Hỗ trợ</div>
                <div class="text-caption text-medium-emphasis">24/7</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="action-card" elevation="2" rounded="xl" @click="emergencyContact">
              <v-card-text class="text-center pa-4">
                <v-icon color="error" size="32" class="mb-2">mdi-phone-alert</v-icon>
                <div class="text-subtitle-2 font-weight-bold">Khẩn cấp</div>
                <div class="text-caption text-medium-emphasis">SOS</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const conversations = ref([
  {
    id: 1,
    name: 'Tài xế Minh',
    lastMessage: 'Tôi đã đến điểm đón, bạn ra nhé! 🚗',
    time: '10:30',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    role: 'driver',
    readReceipt: 'read',
    unreadCount: 0
  },
  {
    id: 2,
    name: 'Tài xế Hùng',
    lastMessage: 'Chuyến đi đã hoàn thành. Cảm ơn bạn!',
    time: '14:20',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    role: 'driver',
    readReceipt: 'sent',
    unreadCount: 0
  },
  {
    id: 3,
    name: 'Hỗ trợ Lạc GO',
    lastMessage: 'Chúng tôi có thể giúp gì cho bạn? 24/7 hỗ trợ',
    time: 'Hôm qua',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c2e19d5e?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    role: 'support',
    readReceipt: null,
    unreadCount: 2
  },
  {
    id: 4,
    name: 'Tài xế Nam',
    lastMessage: 'Xe tôi có thể đón bạn lúc 8h sáng mai không?',
    time: '2 ngày',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    role: 'driver',
    readReceipt: null,
    unreadCount: 1
  }
])

const openConversation = (conversation: any) => {
  // Mark as read when opening
  conversation.unreadCount = 0
  console.log('Opening conversation with:', conversation.name)
  // Navigate to chat detail view
}

const contactSupport = () => {
  console.log('Contact support')
  // Open support chat
}

const emergencyContact = () => {
  console.log('Emergency contact')
  // Emergency call or chat
}
</script>

<style scoped>
.messages-container {
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Gradient Header */
.gradient-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
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

.conversation-card {
  background: linear-gradient(145deg, #ffffff 0%, #fef7ff 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

/* Avatar with Online Status */
.avatar-wrapper {
  position: relative;
}

.gradient-avatar {
  background: linear-gradient(45deg, #ff6b6b 0%, #ee5a6f 100%);
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.online-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
}

.online-status.online {
  background: #4CAF50;
}

.online-status.offline {
  background: #9E9E9E;
}

/* Message Content */
.message-content {
  min-width: 0; /* For text truncation */
}

.message-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.last-message {
  margin-top: 4px;
}

.action-card {
  background: linear-gradient(145deg, #ffffff 0%, #fef7ff 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

/* Badges and Chips */
.v-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.v-badge {
  --v-badge-background: linear-gradient(45deg, #ff6b6b 0%, #ee5a6f 100%);
}

/* Responsive Design */
@media (max-width: 600px) {
  .content-wrapper {
    padding: 16px;
  }
  
  .conversation-card .pa-4 {
    padding: 16px !important;
  }
  
  .avatar-wrapper .gradient-avatar {
    width: 48px !important;
    height: 48px !important;
  }
  
  .online-status {
    width: 14px;
    height: 14px;
  }
}

/* Custom Scrollbar */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.messages-container::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff6b6b 0%, #ee5a6f 100%);
  border-radius: 3px;
}
</style>
