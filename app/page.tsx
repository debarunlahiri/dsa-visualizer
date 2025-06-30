"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  BookOpen, 
  Code, 
  Play, 
  Zap, 
  Target, 
  Trophy, 
  Brain, 
  Rocket,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Play className="w-6 h-6" />,
      title: "Interactive Visualizations",
      description: "Watch algorithms come to life with step-by-step animations and real-time visualizations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Hands-on Practice",
      description: "Solve problems with our integrated code editor and instant feedback system.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Pattern Recognition",
      description: "Master common algorithmic patterns used in technical interviews at top companies.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Interview Prep",
      description: "Comprehensive preparation for coding interviews with curated problem sets.",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { number: "50+", label: "Algorithms", icon: <BarChart3 className="w-5 h-5" /> },
    { number: "1000+", label: "Practice Problems", icon: <Code className="w-5 h-5" /> },
    { number: "25K+", label: "Students", icon: <Users className="w-5 h-5" /> },
    { number: "95%", label: "Success Rate", icon: <Trophy className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Mouse following gradient */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 text-sm text-blue-300 mb-6 animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>New: Interactive Algorithm Patterns Guide</span>
                <Sparkles className="w-4 h-4" />
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                    Master Algorithms
                  </span>
                  <br />
                  <span className="text-white">
                    Through Visualization
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Transform your understanding of Data Structures & Algorithms with 
                  <span className="text-blue-400 font-semibold"> interactive visualizations</span>, 
                  <span className="text-purple-400 font-semibold"> hands-on practice</span>, and 
                  <span className="text-cyan-400 font-semibold"> interview preparation</span>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <Link href="/problems">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/10 w-full sm:w-auto"
                  >
                    <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Start Learning
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/patterns">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="group glass-card border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Patterns
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`glass-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 ${index % 2 === 0 ? 'breathing-glow' : ''}`}
                  >
                    <div className="flex items-center justify-center mb-2 text-blue-400">
                      {stat.icon}
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Experience the most comprehensive and interactive way to learn algorithms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`glass-card p-6 hover:scale-105 transition-all duration-500 border-white/10 group cursor-pointer ${index === 1 || index === 2 ? 'breathing-glow' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Algorithm Visualizer */}
              <Card className="glass-card p-8 border-white/10 hover:scale-105 transition-all duration-300 breathing-glow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-4 mx-auto">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Algorithm Visualizer</h3>
                  <p className="text-gray-300">
                    Watch sorting, searching, and graph algorithms in action
                  </p>
                                     <Link href="/visualizer">
                     <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                       <Play className="w-4 h-4 mr-2" />
                       Start Visualizing
                     </Button>
                   </Link>
                </div>
              </Card>

              {/* Practice Problems */}
              <Card className="glass-card p-8 border-white/10 hover:scale-105 transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 mx-auto">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Practice Problems</h3>
                  <p className="text-gray-300">
                    Solve curated problems with instant feedback and hints
                  </p>
                  <Link href="/practice">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Code className="w-4 h-4 mr-2" />
                      Start Coding
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Pattern Guide */}
              <Card className="glass-card p-8 border-white/10 hover:scale-105 transition-all duration-300 breathing-glow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 mx-auto">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Pattern Guide</h3>
                  <p className="text-gray-300">
                    Master the most common algorithmic patterns and techniques
                  </p>
                  <Link href="/patterns">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <Target className="w-4 h-4 mr-2" />
                      Learn Patterns
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass-card p-12 border-white/10 breathing-glow">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Ready to Ace Your Next Interview?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Join thousands of developers who have mastered algorithms through our interactive platform
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <Link href="/problems">
                    <Button 
                      size="lg" 
                      className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/10"
                    >
                      <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Get Started Now
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Free Forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>No Setup Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} DSA Visualizer - Master Algorithms Through Interactive Learning
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
