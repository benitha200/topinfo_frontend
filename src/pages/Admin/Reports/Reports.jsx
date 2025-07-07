import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DollarSign,
    Users,
    FileText,
    Download,
    Calendar,
    Activity,
    BarChart3,
    PieChart
} from "lucide-react";
import AdminLayout from '../AdminLayout';
import API_URL from '../../../constants/Constants';

const Reports = () => {
    const [payments, setPayments] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState('');
    const [selectedReport, setSelectedReport] = useState('all');

    const reportTypes = [
        { id: 'agent', name: 'Agent Performance' },
        { id: 'location', name: 'Location Based' },
    ];


    useEffect(() => {
        fetchPayments();
    }, []);

    const calculateTransactionBreakdown = (amount, clientPrice) => {
        const transactionFee = clientPrice * 0.03; // The fixed client price
        const transactionTax = clientPrice * 0.03;
        const remainingAmount = amount - (clientPrice * 0.03);
        const commission = remainingAmount * 0.15; // 15% commission from remaining amount

        return {
            originalAmount: Number(amount),
            transactionFee,
            transactionTax,
            commission,
            remainingAmount,
            total: commission
        };
    };

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Authentication token not found');
                return;
            }

            const response = await fetch(`${API_URL}/payments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPayments(data);
            setFilteredData(data);
            setError('');
        } catch (error) {
            console.error('Error fetching payments:', error);
            setError('Failed to fetch payments data');
        }
    };

    const filterDataByDateRange = () => {
        if (!startDate || !endDate) return;

        let filtered = payments.filter(payment => {
            const paymentDate = new Date(payment.createdAt);
            return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
        });

        // Apply additional filters based on report type
        switch (selectedReport) {
            case 'completed':
                filtered = filtered.filter(p => p.status === 'COMPLETED');
                break;
            case 'pending':
                filtered = filtered.filter(p => p.status === 'PENDING');
                break;
            case 'agent':
                filtered = filtered.filter(p => p.request.agent !== null);
                break;
            case 'location':
                // Group by location will be handled in downloadReport
                break;
            case 'client':
                // Group by client will be handled in downloadReport
                break;
            default:
                break;
        }

        setFilteredData(filtered);
    };

    const calculateStats = () => {
        const completedPayments = filteredData.filter(p => p.status === 'COMPLETED');
        const totalAmount = completedPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        const averageAmount = totalAmount / (completedPayments.length || 1);

        return {
            totalTransactions: filteredData.length,
            completedTransactions: completedPayments.length,
            totalAmount: totalAmount.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }),
            averageAmount: averageAmount.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' })
        };
    };

    const downloadReport = () => {
        let headers = [];
        let rows = [];

        switch (selectedReport) {
            case 'all':
            case 'completed':
            case 'pending':
                headers = ['Transaction ID', 'Amount', 'Status', 'Date', 'Client Name', 'Location'];
                rows = filteredData.map(payment => [
                    payment.transaction_id,
                    payment.amount,
                    payment.status,
                    new Date(payment.createdAt).toLocaleDateString(),
                    `${payment.client.firstname} ${payment.client.lastname}`,
                    payment.client.location_district
                ]);
                break;

            case 'agent':
                headers = [
                    'Agent Name',
                    'Total Transactions',
                    'Completed Transactions',
                    'Total Transaction Value',
                    'Transaction Fees',
                    'Total Commission',
                    'Total Earnings',
                    'Success Rate',
                    'Average Transaction Value',
                    'Location'
                ];

                const agentStats = {};

                filteredData.forEach(payment => {
                    if (payment.request.agent) {
                        const agentId = payment.request.agent.id;
                        if (!agentStats[agentId]) {
                            agentStats[agentId] = {
                                name: `${payment.request.agent.firstname} ${payment.request.agent.lastname}`,
                                location: `${payment.request.agent.location_district}, ${payment.request.agent.location_province}`,
                                total: 0,
                                completed: 0,
                                totalValue: 0,
                                transactionFees: 0,
                                totalCommission: 0,
                                totalEarnings: 0
                            };
                        }

                        agentStats[agentId].total++;

                        if (payment.status === 'COMPLETED') {
                            const amount = Number(payment.amount);
                            const clientPrice = payment.amount;
                            const breakdown = calculateTransactionBreakdown(amount, clientPrice);

                            agentStats[agentId].completed++;
                            agentStats[agentId].totalValue += breakdown.originalAmount;
                            agentStats[agentId].transactionFees += breakdown.transactionFee;
                            agentStats[agentId].totalCommission += breakdown.commission;
                            agentStats[agentId].totalEarnings += breakdown.total;
                        }
                    }
                });

                rows = Object.values(agentStats).map(stats => [
                    stats.name,
                    stats.total,
                    stats.completed,
                    stats.totalValue.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }).replace(/\s+/g, ' '),
                    stats.transactionFees.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }).replace(/\s+/g, ' '),
                    stats.totalCommission.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }).replace(/\s+/g, ' '),
                    stats.totalEarnings.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }).replace(/\s+/g, ' '),
                    `${((stats.completed / stats.total) * 100).toFixed(1)}%`,
                    (stats.totalValue / stats.completed).toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }).replace(/\s+/g, ' '),
                    stats.location
                ]);
                break;

            case 'location':
                headers = ['District', 'Total Transactions', 'Total Amount', 'Average Amount'];
                const locationStats = {};
                filteredData.forEach(payment => {
                    const district = payment.client.location_district;
                    if (!locationStats[district]) {
                        locationStats[district] = { total: 0, amount: 0 };
                    }
                    locationStats[district].total++;
                    if (payment.status === 'COMPLETED') {
                        locationStats[district].amount += Number(payment.amount);
                    }
                });
                rows = Object.entries(locationStats).map(([district, stats]) => {
                    const formattedAmount = stats.amount.toLocaleString('rw-RW', {
                        style: 'currency',
                        currency: 'RWF',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).replace(/\s+/g, ' ');

                    const averageAmount = (stats.amount / stats.total);
                    const formattedAverage = averageAmount.toLocaleString('rw-RW', {
                        style: 'currency',
                        currency: 'RWF',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).replace(/\s+/g, ' ');

                    return [
                        district,
                        stats.total,
                        formattedAmount,
                        formattedAverage
                    ];
                });
                break;

            case 'client':
                headers = ['Client Name', 'Total Transactions', 'Total Amount', 'Average Transaction'];
                const clientStats = {};
                filteredData.forEach(payment => {
                    const clientId = payment.client.id;
                    if (!clientStats[clientId]) {
                        clientStats[clientId] = {
                            name: `${payment.client.firstname} ${payment.client.lastname}`,
                            total: 0,
                            amount: 0
                        };
                    }
                    clientStats[clientId].total++;
                    if (payment.status === 'COMPLETED') {
                        clientStats[clientId].amount += Number(payment.request.service_category.client_price);
                    }
                });
                rows = Object.values(clientStats).map(stats => [
                    stats.name,
                    stats.total,
                    stats.amount.toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' }),
                    (stats.amount / stats.total).toLocaleString('rw-RW', { style: 'currency', currency: 'RWF' })
                ]);
                break;
        }

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(',')) // Wrap each cell in quotes to handle commas in currency
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedReport}_report_${startDate}_to_${endDate}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };


    const stats = calculateStats();

    const reportCards = [
        {
            title: "Total Transactions",
            description: "Number of transactions in selected period",
            icon: BarChart3,
            stat: stats.totalTransactions,
            color: "bg-sky-50 hover:bg-sky-100 border-sky-200",
            textColor: "text-sky-800",
            iconColor: "text-sky-600"
        },
        {
            title: "Completed Transactions",
            description: "Successfully completed transactions",
            icon: Activity,
            stat: stats.completedTransactions,
            color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
            textColor: "text-emerald-800",
            iconColor: "text-emerald-600"
        },
        {
            title: "Total Amount",
            description: "Total value of completed transactions",
            icon: DollarSign,
            stat: stats.totalAmount,
            color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
            textColor: "text-purple-800",
            iconColor: "text-purple-600"
        },
        {
            title: "Average Transaction",
            description: "Average transaction amount",
            icon: PieChart,
            stat: stats.averageAmount,
            color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
            textColor: "text-amber-800",
            iconColor: "text-amber-600"
        }
    ];

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
                        <p className="text-gray-600">Access and download detailed business reports</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="flex flex-row gap-1.5">
                            <label htmlFor="report-type" className="text-sm mt-2 font-medium text-gray-700">
                                Report Type
                            </label>
                            <Select
                                value={selectedReport}
                                onValueChange={setSelectedReport}
                                name="report-type"
                            >
                                <SelectTrigger id="report-type" className="w-[220px] bg-white border border-gray-200">
                                    <SelectValue placeholder="Choose report type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {reportTypes.map(type => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 border rounded-md"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 border rounded-md"
                            />
                        </div>
                        <Button
                            onClick={filterDataByDateRange}
                            className="gap-2"
                        >
                            <Calendar size={16} />
                            Apply Filter
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reportCards.map((report, index) => (
                        <Card
                            key={index}
                            className={`shadow-lg transition-all duration-300 ${report.color}`}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className={`text-lg font-bold ${report.textColor}`}>
                                    {report.title}
                                </CardTitle>
                                <report.icon className={`h-5 w-5 ${report.iconColor}`} />
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 mb-4">
                                    {report.description}
                                </CardDescription>
                                <div className={`text-xl font-semibold mb-4 ${report.textColor}`}>
                                    {report.stat}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="shadow-lg bg-gray-50">
                    <CardContent className="pt-6">
                        <Button
                            onClick={downloadReport}
                            className="w-full gap-2"
                            disabled={!startDate || !endDate || !selectedReport}
                        >
                            <Download size={16} />
                            Download {reportTypes.find(t => t.id === selectedReport)?.name || 'Report'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default Reports;