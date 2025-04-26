
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDevice } from '@/hooks/use-mobile';

const Monetization = () => {
  const { isMobile } = useDevice();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Monetization</h1>
            <p className="text-muted-foreground">
              Maximize your revenue with our comprehensive monetization tools and strategies.
            </p>
          </div>

          <Tabs defaultValue="options" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="options">Monetization Options</TabsTrigger>
              <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="options">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Platform Revenue Sharing */}
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="p-2 rounded-lg bg-roundabout-light-purple text-roundabout-purple">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      </div>
                      <Badge>Popular</Badge>
                    </div>
                    <CardTitle className="mt-4">Platform Revenue Sharing</CardTitle>
                    <CardDescription>
                      Earn a share of platform revenue based on your engagement and contributions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Up to 70% revenue share
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Monthly payouts
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Low minimum payout threshold
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Performance-based bonuses
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>

                {/* Premium Content */}
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="p-2 rounded-lg bg-roundabout-light-blue text-roundabout-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z"/></svg>
                      </div>
                    </div>
                    <CardTitle className="mt-4">Premium Content</CardTitle>
                    <CardDescription>
                      Create exclusive premium content for subscribers to generate recurring revenue.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Set your own subscription prices
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        85% creator revenue
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Subscriber analytics
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Custom branding options
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create Premium Content</Button>
                  </CardFooter>
                </Card>

                {/* Brand Partnerships */}
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="p-2 rounded-lg bg-roundabout-yellow text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="M16.5 9.4 7.55 4.24"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line><circle cx="18.5" cy="15.5" r="2.5"></circle><path d="M20.27 17.27 22 19"></path></svg>
                      </div>
                    </div>
                    <CardTitle className="mt-4">Brand Partnerships</CardTitle>
                    <CardDescription>
                      Connect with brands for sponsored content opportunities and partnerships.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Matched with relevant brands
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Negotiation support
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Contract templates
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Performance reporting
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Opportunities</Button>
                  </CardFooter>
                </Card>

                {/* Affiliate Marketing */}
                <Card className="card-hover">
                  <CardHeader>
                    <div className="p-2 rounded-lg bg-roundabout-pink text-pink-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                    </div>
                    <CardTitle className="mt-4">Affiliate Marketing</CardTitle>
                    <CardDescription>
                      Earn commissions by promoting products and services to your audience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Access to premium affiliate networks
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Competitive commission rates
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Link management tools
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Real-time conversion tracking
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Browse Affiliate Programs</Button>
                  </CardFooter>
                </Card>

                {/* Digital Products */}
                <Card className="card-hover">
                  <CardHeader>
                    <div className="p-2 rounded-lg bg-roundabout-green text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.9L12 5l4.1 3H20a2 2 0 0 1 1.2.4"/><line x1="12" y1="12" x2="12" y2="19"/><line x1="8" y1="16" x2="16" y2="16"/></svg>
                    </div>
                    <CardTitle className="mt-4">Digital Products</CardTitle>
                    <CardDescription>
                      Create and sell digital products such as courses, templates, and more.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Built-in e-commerce platform
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        90% revenue share
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Secure payment processing
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Customer management tools
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create Digital Product</Button>
                  </CardFooter>
                </Card>

                {/* Creator Fund */}
                <Card className="card-hover">
                  <CardHeader>
                    <div className="p-2 rounded-lg bg-roundabout-orange text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    </div>
                    <CardTitle className="mt-4">Creator Fund</CardTitle>
                    <CardDescription>
                      Apply for grant funding to support your creative projects and growth.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Monthly funding opportunities
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Non-repayable grants
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Project mentorship
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Featured promotion
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Check Eligibility</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Your earnings across all monetization channels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$4,285.42</div>
                        <p className="text-xs text-green-500 flex items-center">
                          ↑ 15% <span className="text-muted-foreground ml-1">from last month</span>
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$842.18</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                          Next payout: June 15, 2025
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Average CPM</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$3.82</div>
                        <p className="text-xs text-green-500 flex items-center">
                          ↑ 8% <span className="text-muted-foreground ml-1">from last month</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className={isMobile ? "overflow-auto" : ""}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Revenue Source</TableHead>
                          <TableHead>Last 30 Days</TableHead>
                          <TableHead>Last 90 Days</TableHead>
                          <TableHead>All Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Platform Revenue Sharing</TableCell>
                          <TableCell>$342.18</TableCell>
                          <TableCell>$896.42</TableCell>
                          <TableCell>$2,145.76</TableCell>
                          <TableCell><Badge variant="outline" className="bg-green-50 text-green-600">Active</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Premium Content</TableCell>
                          <TableCell>$128.50</TableCell>
                          <TableCell>$385.00</TableCell>
                          <TableCell>$840.50</TableCell>
                          <TableCell><Badge variant="outline" className="bg-green-50 text-green-600">Active</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Brand Partnerships</TableCell>
                          <TableCell>$500.00</TableCell>
                          <TableCell>$750.00</TableCell>
                          <TableCell>$1,000.00</TableCell>
                          <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-600">In Progress</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Affiliate Marketing</TableCell>
                          <TableCell>$84.25</TableCell>
                          <TableCell>$162.38</TableCell>
                          <TableCell>$299.16</TableCell>
                          <TableCell><Badge variant="outline" className="bg-green-50 text-green-600">Active</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Digital Products</TableCell>
                          <TableCell>$0.00</TableCell>
                          <TableCell>$0.00</TableCell>
                          <TableCell>$0.00</TableCell>
                          <TableCell><Badge variant="outline" className="bg-slate-100 text-slate-600">Not Started</Badge></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Payout Methods</CardTitle>
                    <CardDescription>Manage your payout preferences and account information.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                          </div>
                          <div>
                            <p className="font-medium">Bank Transfer</p>
                            <p className="text-sm text-muted-foreground">***1234 • Default</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M20 12v4H6a2 2 0 0 0 0 4h14v-4"/><path d="M20 12H6"/></svg>
                          </div>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-muted-foreground">user@example.com</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Information</CardTitle>
                    <CardDescription>Ensure your tax information is up to date for accurate reporting.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 text-amber-800 rounded-lg">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                          <span>Please complete your tax information to ensure compliance and enable payouts.</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tax Form</label>
                        <Select defaultValue="w9">
                          <SelectTrigger>
                            <SelectValue placeholder="Select tax form" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="w9">W-9 (US Persons)</SelectItem>
                            <SelectItem value="w8ben">W-8BEN (Foreign Individuals)</SelectItem>
                            <SelectItem value="w8bene">W-8BEN-E (Foreign Entities)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button className="w-full">Complete Tax Information</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Monetization Preferences</CardTitle>
                    <CardDescription>Customize how your content is monetized across platforms.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
                        <div>
                          <p className="font-medium">Brand Partnership Opportunities</p>
                          <p className="text-sm text-muted-foreground">Receive notifications for relevant brand partnership opportunities.</p>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Badge variant="outline" className="bg-green-50 text-green-600">Enabled</Badge>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
                        <div>
                          <p className="font-medium">Automatic Ad Optimization</p>
                          <p className="text-sm text-muted-foreground">Enable AI-powered optimization of ad placement and formats.</p>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Badge variant="outline" className="bg-green-50 text-green-600">Enabled</Badge>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
                        <div>
                          <p className="font-medium">Cross-Platform Monetization</p>
                          <p className="text-sm text-muted-foreground">Apply monetization settings across all connected platforms.</p>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Badge variant="outline" className="bg-slate-100 text-slate-600">Disabled</Badge>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">Content Paywall Settings</p>
                          <p className="text-sm text-muted-foreground">Manage settings for premium and paywalled content.</p>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Badge variant="outline" className="bg-slate-100 text-slate-600">Disabled</Badge>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Monetization;
