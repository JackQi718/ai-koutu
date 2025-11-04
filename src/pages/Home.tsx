// 定义子组件
function FeatureCard({ icon, title, description, imageUrl, variants }) {
  return (
    <motion.div 
      variants={variants}
      className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 flex items-center justify-center text-blue-500 mb-4">
          <i className={`fas ${icon} text-xl`}></i>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}

// Tech Card Component
function TechCard({ icon, title, description, variants }) {
  return (
    <motion.div 
      variants={variants}
      className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-blue-500 border border-gray-100 dark:border-gray-700"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 flex items-center justify-center text-blue-500 mb-4">
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

// UI Card Component
function UICard({ icon, title, description, variants }) {
  return (
    <motion.div 
      variants={variants}
      className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 flex items-center justify-center text-blue-500 mb-4">
        <i className={`fas ${icon} text-2xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// 导航链接组件
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 py-1 border-b-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
}

// 移动导航链接组件
function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <motion.a
      href={href}
      className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 py-2 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-400 pl-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {label}
    </motion.a>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Sections for animation
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    technical: useRef(null),
    ui: useRef(null),
    contact: useRef(null)
  };
  
  // 正确初始化Hooks，不在循环或回调中调用
  const isInViewHero = useInView(sectionRefs.hero, { once: true, amount: 0.2 });
  const isInViewFeatures = useInView(sectionRefs.features, { once: true, amount: 0.2 });
  const isInViewTechnical = useInView(sectionRefs.technical, { once: true, amount: 0.2 });
  const isInViewUI = useInView(sectionRefs.ui, { once: true, amount: 0.2 });
  const isInViewContact = useInView(sectionRefs.contact, { once: true, amount: 0.2 });
  
  const controlsHero = useAnimation();
  const controlsFeatures = useAnimation();
  const controlsTechnical = useAnimation();
  const controlsUI = useAnimation();
  const controlsContact = useAnimation();
  
  // Apply animations when sections come into view
  useEffect(() => {
    if (isInViewHero) controlsHero.start("visible");
    if (isInViewFeatures) controlsFeatures.start("visible");
    if (isInViewTechnical) controlsTechnical.start("visible");
    if (isInViewUI) controlsUI.start("visible");
    if (isInViewContact) controlsContact.start("visible");
  }, [isInViewHero, isInViewFeatures, isInViewTechnical, isInViewUI, isInViewContact, 
      controlsHero, controlsFeatures, controlsTechnical, controlsUI, controlsContact]);

  // Image URLs for demonstration
  const imageUrls = {
    heroImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=AI%20image%20background%20removal%20tool%2C%20digital%20art%2C%20modern%20interface%2C%20professional%20software&sign=8ae882d60cbd0465c3dbe707af01fdbf",
    featureImage1: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Smart%20background%20removal%20technology%2C%20AI%20algorithm%2C%20digital%20art&sign=ba0e2a60714ba1cc7be7c6397c32bde4",
    featureImage2: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Portrait%20optimization%20feature%2C%20professional%20photo%20editing&sign=d30e54cc566d9f661cc72646e26bb0cc",
    featureImage3: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Multiple%20image%20format%20support%2C%20file%20types%20concept&sign=ebb2fb6e0630a8b2cceb571d997de9f7",
      featureImage4: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Real-time%20preview%20interface%2C%20digital%20design&sign=3cbe03dc084502571d52274c56d3777c",
      featureImage5: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=One-click%20download%20function%2C%20user%20experience%20design&sign=41e6eb92b46f3c0900ac64bb3e7f4eda",
      featureImage6: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Batch%20image%20processing%20and%20automatic%20packaging%2C%20file%20compression%20concept&sign=398d29e7a04364809583e698bb236d61"
  };

  return (
    <div className={cn("min-h-screen flex flex-col", theme === "dark" ? "bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100" : "bg-gray-50 text-gray-900")}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-80 bg-white dark:bg-gray-900/80 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <i className="fas fa-cut text-xl"></i>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">AI智能抠图</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/" label="首页" />
              <NavLink href="#features" label="功能介绍" />
              <NavLink href="#technical" label="技术特点" />
              <NavLink href="#ui" label="界面展示" />
              <NavLink href="#contact" label="关于作者" />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
              >
                立即下载
              </motion.button>
             
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="切换主题"
              >
                <motion.i 
                  className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}
                  animate={{ rotate: theme === 'light' ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                ></motion.i>
              </button>
            </div>
             
              {/* Mobile Navigation Toggle */}
              <div className="flex items-center space-x-4 md:hidden">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  aria-label="切换主题"
                >
                  <motion.i 
                    className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}
                    animate={{ rotate: theme === 'light' ? 0 : 180 }}
                    transition={{ duration: 0.5 }}
                  ></motion.i>
                </button>
                
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
                >
                  <motion.i 
                    className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.i>
                </button>
              </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
              >
              <div className="flex flex-col space-y-4">
                <MobileNavLink href="/" label="首页" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="#features" label="功能介绍" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="#technical" label="技术特点" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="#ui" label="界面展示" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="#contact" label="关于作者" onClick={() => setIsMenuOpen(false)} />
                
                 <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all w-full hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10"
                >
                  立即下载
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="flex-1 pt-20 pb-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          animate={controlsHero}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
            <motion.div variants={fadeInUp} className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">AI驱动的智能抠图</span><br />
                让图像处理变得简单高效
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                基于先进的AI模型，自动识别并移除图像背景，为您提供专业级的抠图体验。完全本地化运行，保护您的隐私安全。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                   whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg transition-all flex items-center justify-center hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10"
                >
                  <i className="fas fa-download mr-2"></i> 立即下载
                </motion.button>
                 <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#features"
                  className="px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-700 font-medium text-lg hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-500/5"
                >
                  <i className="fas fa-info-circle mr-2"></i> 了解更多
                </motion.a>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-2xl animate-pulse"></div>
              <img 
                src={imageUrls.heroImage} 
                alt="AI智能抠图展示" 
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover hover:shadow-2xl transition-all duration-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        ref={sectionRefs.features}
         className={`py-20 px-4 ${theme === "dark" ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white"}`}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
          initial="hidden"
          animate={controlsFeatures}
          variants={staggerContainer}
          className="text-center mb-16"
        >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              核心功能
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              我们的AI智能抠图工具提供全方位的图像处理功能，满足您的各种需求
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
          initial="hidden"
          animate={controlsFeatures}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            <FeatureCard 
              icon="fa-magic" 
              title="智能抠图" 
              description="基于先进的AI模型自动移除图像背景，精准识别主体，保留细节。" 
              imageUrl={imageUrls.featureImage1}
              variants={fadeInUp}
            />
            <FeatureCard 
              icon="fa-user-edit" 
              title="人像优化" 
              description="专门针对人像进行优化处理，智能识别毛发、半透明物体等复杂边缘。" 
              imageUrl={imageUrls.featureImage2}
              variants={fadeInUp}
            />
            <FeatureCard 
              icon="fa-file-image" 
              title="多格式支持" 
              description="支持JPG、PNG、BMP、GIF、WebP等多种图像格式，满足不同场景需求。" 
              imageUrl={imageUrls.featureImage3}
              variants={fadeInUp}
            />
            <FeatureCard 
              icon="fa-eye" 
              title="实时预览" 
              description="即时查看处理结果，调整参数实时反馈，提高工作效率。" 
              imageUrl={imageUrls.featureImage4}
              variants={fadeInUp}
            />
            <FeatureCard 
              icon="fa-download" 
              title="一键下载" 
              description="方便保存处理后的图像，支持多种格式和质量选项。" 
              imageUrl={imageUrls.featureImage5}
              variants={fadeInUp}
            />
            <FeatureCard 
              icon="fa-box" 
              title="自动打包" 
              description="批量抠图完成后会自动打包为压缩文件，方便用户一次性下载所有处理结果。" 
              imageUrl="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Batch%20image%20processing%20and%20automatic%20packaging%2C%20file%20compression%20concept&sign=398d29e7a04364809583e698bb236d61"
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* Technical Section */}
       <section 
        id="technical"
        ref={sectionRefs.technical}
         className={`py-20 px-4 ${theme === "dark" ? "bg-gray-900/80" : "bg-gray-50"}`}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial="hidden"
          animate={controlsTechnical}
          variants={staggerContainer}
          className="text-center mb-16"
        >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              技术特点
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              我们的技术确保高效、安全、稳定的图像处理体验
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
          animate={controlsTechnical}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
            <TechCard 
              icon="fa-shield-alt" 
              title="本地化运行" 
              description="完全在本地运行，所有图像处理均不经过服务器，保护用户隐私。" 
              variants={fadeInUp}
            />
            <TechCard 
              icon="fa-microchip" 
              title="GPU加速" 
              description="支持CUDA加速，大幅提升处理速度，让复杂图像处理变得流畅。" 
              variants={fadeInUp}
            />
            <TechCard 
              icon="fa-memory" 
              title="内存优化" 
              description="智能内存管理，支持大图像处理，避免内存溢出问题。" 
              variants={fadeInUp}
            />
            <TechCard 
              icon="fa-exclamation-triangle" 
              title="错误处理" 
              description="完善的错误处理和恢复机制，确保软件稳定运行。" 
              variants={fadeInUp}
            />
            <TechCard 
              icon="fa-chart-line" 
              title="性能监控" 
              description="实时监控系统性能，根据硬件条件自动调整处理策略。" 
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* UI Section */}
       <section 
        id="ui"
        ref={sectionRefs.ui}
         className={`py-20 px-4 ${theme === "dark" ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white"}`}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial="hidden"
          animate={controlsUI}
          variants={staggerContainer}
          className="text-center mb-16"
        >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              用户界面
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              简洁直观的用户界面，让操作变得轻松愉快
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
          animate={controlsUI}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            <UICard 
              icon="fa-language" 
              title="全中文界面" 
              description="完全中文化的用户界面，符合中文用户的使用习惯。" 
              variants={fadeInUp}
            />
            <UICard 
              icon="fa-tablet-alt" 
              title="响应式设计" 
              description="适配不同屏幕尺寸，在桌面、平板和手机上都有良好的使用体验。" 
              variants={fadeInUp}
            />
            <UICard 
              icon="fa-mouse-pointer" 
              title="直观操作" 
              description="简单易懂的操作流程，让用户轻松上手，无需专业技能。" 
              variants={fadeInUp}
            />
            <UICard 
              icon="fa-images" 
              title="示例图像" 
              description="提供示例图像快速测试，了解软件功能和效果。" 
              variants={fadeInUp}
            />
            <UICard 
              icon="fa-bell" 
              title="状态提示" 
              description="清晰的操作状态反馈，让用户了解当前进度和结果。" 
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
       <section 
        id="contact"
        ref={sectionRefs.contact}
         className={`py-20 px-4 ${theme === "dark" ? "bg-gray-900/80" : "bg-gray-50"}`}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial="hidden"
          animate={controlsContact}
          variants={staggerContainer}
           className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700"
        >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">联系作者</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                有任何问题、建议或合作意向，欢迎随时联系
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center justify-center gap-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                <i className="fas fa-user"></i>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">北山</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <a href="mailto:blacklaw@foxmail.com" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                    <i className="fas fa-envelope mr-2"></i> blacklaw@foxmail.com
                </a>
                  <a href="wechat:BEISHAN5678" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                    <i className="fab fa-weixin mr-2"></i> BEISHAN5678
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
       <footer className={`py-10 px-4 ${theme === "dark" ? "bg-gray-950/90 border-t border-gray-900" : "bg-gray-100 border-t border-gray-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <i className="fas fa-cut"></i>
              </div>
              <span className="text-lg font-bold">AI智能抠图</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-center md:text-right">
              <p>© 2025 AI智能抠图 - 开源项目</p>
              <p className="mt-1">基于先进AI技术的图像背景处理工具</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

