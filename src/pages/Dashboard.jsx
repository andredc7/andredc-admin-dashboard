import React from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend)

export default function Dashboard(){
  const labels = ['Jan','Feb','Mar','Apr','May','Jun']
  const lineData = {
    labels,
    datasets:[{label:'Active users', data:[120,200,150,220,300,280], tension:0.4}]
  }
  const barData = {labels, datasets:[{label:'Sales', data:[30,50,40,60,80,70]}]}
  const pieData = {labels:['Chrome','Safari','Firefox'], datasets:[{data:[60,25,15]}]}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">ANDRE Admin Dashboard</h1>
      </header>
      <section className="grid gap-6 sm:grid-cols-2">
        <div className="p-4 bg-white rounded shadow"><h3 className="font-semibold">Users</h3><Line data={lineData} /></div>
        <div className="p-4 bg-white rounded shadow"><h3 className="font-semibold">Sales</h3><Bar data={barData} /></div>
        <div className="p-4 bg-white rounded shadow sm:col-span-2"><h3 className="font-semibold">Browser Share</h3><Pie data={pieData} /></div>
      </section>
    </div>
  )
}
