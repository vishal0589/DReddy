import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', received: 279, finalList: 279, delivered: 278, returned: 7, leftOrg: 1, lost: 0, dispatchRate: 100 },
  { month: 'Feb', received: 312, finalList: 312, delivered: 311, returned: 5, leftOrg: 2, lost: 0, dispatchRate: 100 },
  { month: 'Mar', received: 399, finalList: 391, delivered: 389, returned: 8, leftOrg: 8, lost: 1, dispatchRate: 98 },
  { month: 'Apr', received: 631, finalList: 625, delivered: 625, returned: 12, leftOrg: 6, lost: 0, dispatchRate: 99 },
  { month: 'May', received: 348, finalList: 348, delivered: 348, returned: 11, leftOrg: 0, lost: 1, dispatchRate: 100 },
  { month: 'Jun', received: 441, finalList: 405, delivered: 403, returned: 18, leftOrg: 36, lost: 0, dispatchRate: 91.8 },
  { month: 'Jul', received: 398, finalList: 391, delivered: 389, returned: 9, leftOrg: 7, lost: 0, dispatchRate: 98.2 },
  { month: 'Aug', received: 536, finalList: 533, delivered: 531, returned: 10, leftOrg: 2, lost: 0, dispatchRate: 99.4 },
  { month: 'Sep', received: 410, finalList: 409, delivered: 408, returned: 4, leftOrg: 1, lost: 0, dispatchRate: 99.8 },
  { month: 'Oct', received: 274, finalList: 276, delivered: 273, returned: 2, leftOrg: 0, lost: 0, dispatchRate: 100 },
  { month: 'Nov', received: 300, finalList: 295, delivered: 287, returned: 8, leftOrg: 5, lost: 0, dispatchRate: 98.3 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const STATUS_COLORS = {
  delivered: '#00C49F',
  returned: '#FFBB28',
  leftOrg: '#FF8042',
  lost: '#FF0000'
};

const THRESHOLDS = {
  DELIVERY_SUCCESS: 98,
  DISPATCH_RATE: 95,
  RETURN_RATE: 5,
  LOST_RATE: 0.1,
  PRE_DISPATCH_LOSS: 2
};

export default function DeliveryDashboard() {
  // Calculate totals
  const totalInitialList = 4328;
  const totalFinalList = 4264;
  const totalDelivered = 4242;
  const totalReturned = 94;
  const totalLeftOrg = 68;
  const totalLost = 2;

  const preDispatchLoss = totalInitialList - totalFinalList;
  const preDispatchLossRate = ((preDispatchLoss / totalInitialList) * 100).toFixed(1);
  const deliverySuccess = ((totalDelivered / totalFinalList) * 100).toFixed(1);
  const returnRate = ((totalReturned / totalFinalList) * 100).toFixed(1);

  const statusDistribution = [
    { name: 'Delivered', value: totalDelivered },
    { name: 'Returned', value: totalReturned },
    { name: 'Left Organization', value: totalLeftOrg },
    { name: 'Lost', value: totalLost }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gift1 Delivery Performance FY 2024</h1>
            <p className="text-gray-600">Annual Summary Dashboard</p>
          </div>
          {/* New Summary Box */}
          <Card className="bg-white p-4">
            <CardTitle>Gift Processing Summary</CardTitle>
            <CardContent>
              <div className="text-sm space-y-1">
                <p>Initial List: {totalInitialList.toLocaleString()}</p>
                <p className="text-red-500">Pre-dispatch Loss: {preDispatchLoss}</p>
                <p>Final Dispatch List: {totalFinalList.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Pre-dispatch Loss</CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-3xl font-bold ${parseFloat(preDispatchLossRate) <= THRESHOLDS.PRE_DISPATCH_LOSS ? 'text-green-500' : 'text-red-500'}`}>
                  {preDispatchLossRate}%
                </p>
                <p className="text-sm text-gray-600 mt-1">{preDispatchLoss} units lost</p>
              </div>
              <AlertTriangle className={`h-12 w-12 ${parseFloat(preDispatchLossRate) <= THRESHOLDS.PRE_DISPATCH_LOSS ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Delivery Success</CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-3xl font-bold ${parseFloat(deliverySuccess) >= THRESHOLDS.DELIVERY_SUCCESS ? 'text-green-500' : 'text-red-500'}`}>
                  {deliverySuccess}%
                </p>
                <p className="text-sm text-gray-600 mt-1">{totalDelivered.toLocaleString()} delivered</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Return Rate</CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-3xl font-bold ${parseFloat(returnRate) <= THRESHOLDS.RETURN_RATE ? 'text-green-500' : 'text-red-500'}`}>
                  {returnRate}%
                </p>
                <p className="text-sm text-gray-600 mt-1">{totalReturned} returns</p>
              </div>
              <RefreshCw className="h-12 w-12 text-yellow-500" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Process Loss</CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalLost}</p>
                <p className="text-sm text-gray-600 mt-1">{totalLeftOrg} left org.</p>
              </div>
              <Package className="h-12 w-12 text-blue-500" />
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Delivery Trends Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Delivery Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="received" name="Received" stroke="#8884d8" />
                  <Line yAxisId="left" type="monotone" dataKey="delivered" name="Delivered" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="dispatchRate" name="Dispatch Rate %" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Returns Analysis Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Returns & Left Organization Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="returned" stackId="a" fill={STATUS_COLORS.returned} name="Returns" />
                  <Bar dataKey="leftOrg" stackId="a" fill={STATUS_COLORS.leftOrg} name="Left Organization" />
                  <Bar dataKey="lost" stackId="a" fill={STATUS_COLORS.lost} name="Lost/Disparity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Chart */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Overall Delivery Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
