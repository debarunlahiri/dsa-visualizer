// Test Supabase Connection
// Run this with: node test-supabase-connection.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://oslhyeqszspcsifnjpjx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zbGh5ZXFzenNwY3NpZm5qcGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMzMzOTcsImV4cCI6MjA2MTkwOTM5N30.LozSVhKPKsD5qXpI74T5Z0UQeLWI2I5o5ElPgVH7uqc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🧪 Testing Supabase connection...')
  
  try {
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('problem_analytics')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      console.log('\n💡 Make sure you have:')
      console.log('1. Run the supabase-schema.sql in your Supabase SQL editor')
      console.log('2. Created the .env.local file with the correct credentials')
      return
    }
    
    console.log('✅ Connection successful!')
    console.log('📊 Sample data:', data)
    
    // Test 2: Try inserting a test practice
    console.log('\n🧪 Testing practice insertion...')
    
    const testPractice = {
      user_id: 'test_user_' + Date.now(),
      problem_slug: 'test-problem',
      problem_title: 'Test Problem',
      language: 'JavaScript',
      code: 'console.log("Hello, World!");',
      status: 'completed',
      execution_time: 25,
      test_cases_passed: 1,
      total_test_cases: 1
    }
    
    const { data: practiceData, error: practiceError } = await supabase
      .from('coding_practices')
      .insert(testPractice)
      .select()
      .single()
    
    if (practiceError) {
      console.error('❌ Practice insertion failed:', practiceError.message)
      return
    }
    
    console.log('✅ Practice insertion successful!')
    console.log('📝 Created practice:', practiceData)
    
    // Test 3: Check user progress creation
    console.log('\n🧪 Testing user progress...')
    
    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', testPractice.user_id)
      .single()
    
    if (progressData) {
      console.log('✅ User progress found:', progressData)
    } else if (progressError?.code === 'PGRST116') {
      console.log('ℹ️ No user progress yet (expected for new user)')
    } else {
      console.error('❌ Progress check failed:', progressError?.message)
    }
    
    console.log('\n🎉 All tests passed! Your Supabase integration is ready!')
    console.log('\n🚀 You can now:')
    console.log('1. Start your Next.js dev server: npm run dev')
    console.log('2. Visit http://localhost:3000/practice-demo to test the UI')
    console.log('3. Visit http://localhost:3000/practice for the dashboard')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

testConnection() 