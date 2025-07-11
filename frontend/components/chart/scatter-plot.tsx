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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">X-Axis</label>
          <Select value={xAxis} onValueChange={setXAxis}>
            <SelectTrigger>
              <SelectValue placeholder="Select X-axis column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Y-Axis</label>
          <Select value={yAxis} onValueChange={setYAxis}>
            <SelectTrigger>
              <SelectValue placeholder="Select Y-axis column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
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
          className="w-full"
        >
          Create Plot
        </Button>
      )}

      {showPlot && plotData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scatter Plot</CardTitle>
            <CardDescription>
              {xAxis} vs {yAxis}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={plotData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="x" 
                    name={xAxis}
                    label={{ value: xAxis, position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    dataKey="y" 
                    name={yAxis}
                    label={{ value: yAxis, angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={() => ''}
                  />
                  <Scatter dataKey="y" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}