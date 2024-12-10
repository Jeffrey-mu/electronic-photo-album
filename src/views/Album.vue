<template>
  <div class="album-view" v-if="currentAlbum">
    <div class="album-header">
      <el-page-header @back="goBack" :title="currentAlbum.name">
        <template #content>
          <span class="photo-count">{{ currentAlbum.photos.length }}张照片</span>
        </template>
      </el-page-header>
    </div>

    <div class="photo-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-container" @click="showPhotoDetail(photo)">
        <el-image :src="photo.url" fit="cover" class="photo-item" loading="lazy">
          <template #placeholder>
            <div class="image-slot">
              <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
            </div>
          </template>
          <template #error>
            <div class="image-slot">
              <el-icon>
                <Picture />
              </el-icon>
            </div>
          </template>
        </el-image>
        <div class="photo-info-overlay">
          <h3>{{ photo.title }}</h3>
          <div class="meta">
            <span><el-icon>
                <Location />
              </el-icon>{{ photo.location }}</span>
            <span><el-icon>
                <Calendar />
              </el-icon>{{ photo.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 照片详情对话框 -->
    <el-dialog v-model="dialogVisible" :title="currentPhoto?.title" width="90%" class="photo-dialog"
      :close-on-click-modal="false" :show-close="true" destroy-on-close>
      <div class="photo-detail">
        <div class="photo-preview" @click="showFullPreview">
          <el-image :src="currentPhoto?.url" fit="contain" class="preview-image" loading="lazy" />
          <!-- <div class="preview-hint">
            <el-icon>
              <ZoomIn />
            </el-icon>
            <span>点击查看大图</span>
          </div> -->
        </div>
        <div class="photo-info">
          <div class="info-header">
            <h3>{{ currentPhoto?.title }}</h3>
            <el-button class="share-btn" :icon="Share" circle text />
          </div>

          <div class="meta-info">
            <div class="meta-item">
              <el-icon>
                <Location />
              </el-icon>
              <span>{{ currentPhoto?.location }}</span>
            </div>
            <div class="meta-item">
              <el-icon>
                <Calendar />
              </el-icon>
              <span>{{ currentPhoto?.date }}</span>
            </div>
          </div>

          <el-divider />

          <div class="description-section">
            <h4>照片描述</h4>
            <p class="description">{{ currentPhoto?.description }}</p>
          </div>

          <!-- <div class="actions">
            <el-button class="preview-btn" @click="showFullPreview">
              <el-icon>
                <ZoomIn />
              </el-icon>查看大图
            </el-button>
            <el-button class="download-btn">
              <el-icon>
                <Download />
              </el-icon>下载照片
            </el-button>
          </div> -->
        </div>
      </div>
    </el-dialog>
  </div>
  <div v-else class="not-found">
    <el-empty description="相册不存在" />
    <el-button type="primary" @click="goBack">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
/// <reference lib="ES2015" />

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ZoomIn, Share, Download, Picture } from '@element-plus/icons-vue'
import { ElSkeletonItem } from 'element-plus'
import { albums, type Photo } from '@/config/albums'

const route = useRoute()
const router = useRouter()

const currentAlbum = computed(() => {
  return albums.find(a => a.id === Number(route.params.id))
})

const album = ref({
  id: Number(route.params.id),
  name: currentAlbum.value?.name || '相册',
  photoCount: currentAlbum.value?.photos.length || 0
})

const photos = ref<Photo[]>(currentAlbum.value?.photos || [])

const photoUrls = computed(() => photos.value.map(photo => photo.url))

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  album.value.photoCount = photos.value.length
})

const getPhotoIndex = (photo: Photo) => {
  return photos.value.findIndex(p => p.id === photo.id)
}

const dialogVisible = ref(false)
const currentPhoto = ref<Photo | null>(null)

const showPhotoDetail = (photo: Photo) => {
  currentPhoto.value = photo
  dialogVisible.value = true
}

const showFullPreview = () => {
  // 在这里实现全屏预览的逻辑
}
</script>

<style scoped lang="scss">
.album-view {
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 0;
}

.album-header {
  padding: 40px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), transparent);

  :deep(.el-page-header) {
    color: #ffffff;

    .el-page-header__left {
      .el-icon {
        font-size: 20px;
        color: #ffffff;
      }

      .el-page-header__title {
        font-size: 16px;
        color: #ffffff;
        opacity: 0.8;
      }
    }

    .el-page-header__content {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 2px;
    }
  }

  .photo-count {
    font-size: 16px;
    opacity: 0.8;
    margin-left: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
  }
}

.photo-grid {
  padding: 20px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;

  .photo-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 4/3;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

      .photo-info-overlay {
        opacity: 1;
        transform: translateY(0);
      }

      .photo-item {
        transform: scale(1.05);
      }
    }
  }

  .photo-item {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .photo-info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;

    h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 0.5px;
    }

    .meta {
      display: flex;
      gap: 16px;
      font-size: 14px;
      opacity: 0.8;

      span {
        display: flex;
        align-items: center;
        gap: 4px;

        .el-icon {
          font-size: 16px;
        }
      }
    }
  }
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;

  .el-icon {
    font-size: 30px;
    opacity: 0.5;
  }
}

.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;

  :deep(.el-empty) {
    .el-empty__description {
      color: #ffffff;
    }
  }
}

@media (max-width: 768px) {
  .album-header {
    padding: 20px;
  }

  .photo-grid {
    padding: 10px 20px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }

  .photo-info-overlay {
    padding: 15px;

    h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }

    .meta {
      font-size: 12px;
      gap: 12px;

      .el-icon {
        font-size: 14px;
      }
    }
  }
}

:deep(.el-image-viewer__wrapper) {
  z-index: 2100;
}

:deep(.el-image-viewer__mask) {
  z-index: 2099;
}


:deep(.photo-dialog) {
  background-color: rgba(18, 18, 18, 0.95);
  color: #ffffff;
  background: rgba(18, 18, 18, 0.95) !important;
  border-radius: 16px !important;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);

  .el-dialog__header {
    margin: 0;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2);

    .el-dialog__title {
      font-size: 20px;
      font-weight: 300;
      color: #ffffff !important;
      letter-spacing: 1px;
    }

    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #909399;

        &:hover {
          color: #606266;
        }
      }
    }
  }

  .el-dialog__body {
    padding: 0;
    background: rgba(0, 0, 0, 0.2);
    color: #ffffff !important;
  }

  .el-button {
    --el-button-bg-color: transparent !important;
    --el-button-border-color: rgba(255, 255, 255, 0.2) !important;
    --el-button-hover-bg-color: rgba(255, 255, 255, 0.15) !important;
    --el-button-hover-border-color: rgba(255, 255, 255, 0.25) !important;
    --el-button-active-bg-color: rgba(255, 255, 255, 0.2) !important;
    --el-button-active-border-color: rgba(255, 255, 255, 0.3) !important;
  }

  .el-divider {
    --el-border-color: rgba(255, 255, 255, 0.1) !important;
  }
}

.photo-detail {
  display: flex;
  min-height: 600px;
  background: rgba(0, 0, 0, 0.2);

  .photo-preview {
    flex: 3;
    position: relative;
    background: #000;
    cursor: zoom-in;
    overflow: hidden;

    // ... 保持不变 ...
  }

  .photo-info {
    flex: 1;
    padding: 30px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    max-width: 400px;
    color: #ffffff;

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h3 {
        margin: 0;
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }

    .meta-info {
      margin-bottom: 20px;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;

        .el-icon {
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }

    .description-section {
      h4 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.9);
      }

      .description {
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>
