'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ScatterPlotProps {
  fileId: string
  columns: string[]
  data: any[]
}

export function ScatterPlot({ fileId, columns, data }: ScatterPlotProps) {
  const [xAxis, setXAxis] = useState(columns[0] || '')
  const [yAxis, setYAxis] = useState(columns[1] || '')
  const [plotData, setPlotData] = useState<any[]>([])
  const [showPlot, setShowPlot] = useState(false)

  const generatePlot = () => {
    if (!xAxis || !yAxis) return

    const formattedData = data.map((row, index) => ({
      x: parseFloat(row[xAxis]) || 0,
      y: parseFloat(row[yAxis]) || 0,
      id: index
    }))

    setPlotData(formattedData)
    setShowPlot(true)
  }

  useEffect(() => {
    if (showPlot && xAxis && yAxis) {
      generatePlot()
    }
  }, [xAxis, yAxis])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-bold text-black mb-3">
            X-Axis Column
          </label>
          <Select value={xAxis} onValueChange={setXAxis}>
            <SelectTrigger className="border-2 border-black focus:border-black focus:ring-0 h-14 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              <SelectValue placeholder="Select X-axis column" className="text-base font-medium" />
            </SelectTrigger>
            <SelectContent className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {columns.map((column) => (
                <SelectItem 
                  key={column} 
                  value={column}
                  className="hover:bg-gray-100 focus:bg-gray-100 text-black font-medium py-3 px-4 cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-black mr-3"></div>
                    {column}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-black mb-3">
            Y-Axis Column
          </label>
          <Select value={yAxis} onValueChange={setYAxis}>
            <SelectTrigger className="border-2 border-black focus:border-black focus:ring-0 h-14 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              <SelectValue placeholder="Select Y-axis column" className="text-base font-medium" />
            </SelectTrigger>
            <SelectContent className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {columns.map((column) => (
                <SelectItem 
                  key={column} 
                  value={column}
                  className="hover:bg-gray-100 focus:bg-gray-100 text-black font-medium py-3 px-4 cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-black mr-3"></div>
                    {column}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!showPlot && (
        <Button 
          onClick={generatePlot} 
          disabled={!xAxis || !yAxis}
          className="w-full h-14 bg-black text-white hover:bg-gray-800 border-2 border-black font-bold text-lg transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
        >
          Create Scatter Plot
        </Button>
      )}

      {showPlot && plotData.length > 0 && (
        <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardHeader className="bg-white text-black">
            <CardTitle className="text-2xl font-bold">Scatter Plot Visualization</CardTitle>
            <CardDescription className="text-black/80 text-base">
              {xAxis} vs {yAxis} • {plotData.length} data points
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-50 p-6 border-2 border-black h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart 
                  data={plotData}
                  margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#666"
                    strokeWidth={1}
                  />
                  <XAxis 
                    dataKey="x" 
                    name={xAxis}
                    tick={{ fill: '#000', fontSize: 12, fontWeight: 'bold' }}
                    axisLine={{ stroke: '#000', strokeWidth: 2 }}
                    tickLine={{ stroke: '#000', strokeWidth: 2 }}
                    label={{ 
                      value: xAxis, 
                      position: 'insideBottom', 
                      offset: -40,
                      style: { textAnchor: 'middle', fill: '#000', fontWeight: 'bold', fontSize: '14px' }
                    }}
                  />
                  <YAxis 
                    dataKey="y" 
                    name={yAxis}
                    tick={{ fill: '#000', fontSize: 12, fontWeight: 'bold' }}
                    axisLine={{ stroke: '#000', strokeWidth: 2 }}
                    tickLine={{ stroke: '#000', strokeWidth: 2 }}
                    label={{ 
                      value: yAxis, 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -30,
                      style: { textAnchor: 'middle', fill: '#000', fontWeight: 'bold', fontSize: '14px' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      typeof value === 'number' ? value.toFixed(2) : value, 
                      name
                    ]}
                    labelFormatter={() => ''}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '2px solid black',
                      borderRadius: '0px',
                      boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)',
                      fontWeight: 'bold'
                    }}
                  />
                  <Scatter 
                    dataKey="y" 
                    fill="#000000" 
                    stroke="#000000"
                    strokeWidth={1}
                    r={5}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            {/* Plot Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black text-white p-4 border-2 border-black">
                <h4 className="font-bold text-sm mb-1">X-Axis Range</h4>
                <p className="text-sm">
                  {Math.min(...plotData.map(d => d.x)).toFixed(2)} - {Math.max(...plotData.map(d => d.x)).toFixed(2)}
                </p>
              </div>
              <div className="bg-black text-white p-4 border-2 border-black">
                <h4 className="font-bold text-sm mb-1">Y-Axis Range</h4>
                <p className="text-sm">
                  {Math.min(...plotData.map(d => d.y)).toFixed(2)} - {Math.max(...plotData.map(d => d.y)).toFixed(2)}
                </p>
              </div>
              <div className="bg-black text-white p-4 border-2 border-black">
                <h4 className="font-bold text-sm mb-1">Data Points</h4>
                <p className="text-sm">{plotData.length} total points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}