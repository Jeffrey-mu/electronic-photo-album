<template>
  <div class="home">
    <div class="hero-section">
      <h1>时光印记</h1>
      <p class="subtitle">每一刻都是永恒</p>
    </div>
    <div class="album-container">
      <button class="scroll-btn left" @click="scrollAlbums('left')">
        <el-icon><ArrowLeft /></el-icon>
      </button>
      <div class="album-grid">
        <el-card
          v-for="album in albumList"
          :key="album.id"
          :body-style="{ padding: '0px', background: 'transparent' }"
          class="album-card"
          @click="goToAlbum(album.id)"
        >
          <div class="album-wrapper">
            <img :src="album.cover" class="album-cover" />
            <div class="album-overlay"></div>
            <div class="album-info">
              <h3>{{ album.name }}</h3>
              <span class="photo-count">{{ album.photos.length }} 张照片</span>
              <p class="album-desc">{{ album.description }}</p>
            </div>
          </div>
        </el-card>
      </div>
      <button class="scroll-btn right" @click="scrollAlbums('right')">
        <el-icon><ArrowRight /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { albums } from '@/config/albums'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const albumList = ref(albums)

const goToAlbum = (id: number) => {
  router.push(`/album/${id}`)
}

const scrollAlbums = (direction: 'left' | 'right') => {
  const container = document.querySelector('.album-grid')
  if (container) {
    const scrollAmount = 400
    const scrollTo = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url('https://picsum.photos/1920/1080') center/cover fixed;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, transparent 20%, #000000 150%);
  }

  h1 {
    font-size: 4.5rem;
    font-weight: 200;
    letter-spacing: 8px;
    margin: 0;
    position: relative;
    text-transform: uppercase;
    background: linear-gradient(45deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 1rem;
    opacity: 0.9;
    letter-spacing: 3px;
    position: relative;
  }
}

.album-container {
  padding: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 0;
}

.album-grid {
  display: flex;
  overflow-x: auto;
  gap: 40px;
  padding: 0 96px;
  padding-bottom: 20px;
  margin: 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.album-card {
  flex: 0 0 320px;
  background: transparent;
  border: none;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    
    .album-overlay {
      opacity: 0.4;
    }
    
    .album-info {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.album-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.album-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.album-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  color: #ffffff;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;

  h3 {
    font-size: 1.8rem;
    font-weight: 300;
    margin: 0;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }

  .photo-count {
    font-size: 1rem;
    opacity: 0.8;
    font-weight: 300;
    letter-spacing: 1px;
  }
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: white;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-icon {
    font-size: 28px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.05);
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 20px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    
    h1 {
      font-size: 3rem;
      letter-spacing: 4px;
    }
    
    .subtitle {
      font-size: 1.2rem;
    }
  }

  .album-container {
    padding: 20px;
    padding-bottom: 40px;
  }

  .album-grid {
    padding: 0 18px;
  }

  .album-card {
    flex: 0 0 280px;
  }

  .album-info h3 {
    font-size: 1.5rem;
  }

  .scroll-btn {
    width: 44px;
    height: 44px;
    
    .el-icon {
      font-size: 22px;
    }

    &.left {
      left: -18px;
    }

    &.right {
      right: -18px;
    }
  }
}
</style>
