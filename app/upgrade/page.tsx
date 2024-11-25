"use client"

import { Check, Sparkles, Music2, Download, Wifi } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  { icon: Music2, title: "无损音质", description: "体验原声级音频质量" },
  { icon: Download, title: "离线下载", description: "随时随地畅听音乐" },
  { icon: Wifi, title: "跨设备同步", description: "无缝切换各种设备" },
]

const plans = [
  {
    name: "个人会员",
    price: "18",
    features: ["无广告打扰", "高品质音频", "离线下载", "跨设备同步"],
  },
  {
    name: "家庭会员",
    price: "28",
    features: ["最多6个账号", "无广告打扰", "高品质音频", "离线下载", "跨设备同步", "家庭共享"],
    popular: true,
  },
]

export default function UpgradePage() {
  return (
    <div className="p-8">
      {/* Hero Banner */}
      <motion.section 
        className="relative h-[50vh] mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 mb-6" />
            <h1 className="text-6xl font-bold mb-4">升级到高级版</h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              解锁完整的音乐体验，尽情享受高品质音乐。
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Plans */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative p-8 rounded-2xl ${
                plan.popular ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-white/5'
              } flex flex-col`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-sm">
                  最受欢迎
                </span>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">¥{plan.price}</span>
                  <span className="text-white/60">/月</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                className={`w-full mt-8 py-3 rounded-full font-semibold ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                立即升级
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
} 