
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { mockProperties } from "@/data/mockData";

// Create mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "New high-score property detected",
    message: "A new property at Herengracht 121 has scored 92/100 on our development score.",
    date: "2025-05-20T09:30:00",
    read: false,
    type: "high-score",
    propertyId: mockProperties[0].id,
  },
  {
    id: "2",
    title: "Market update: Cap rates rising in Amsterdam",
    message: "Average cap rates have increased by 0.3% in the Amsterdam area in the last month.",
    date: "2025-05-19T14:45:00",
    read: true,
    type: "market-update",
    propertyId: null,
  },
  {
    id: "3",
    title: "Property needs review",
    message: "Keizersgracht 456 requires manual review due to zoning complications.",
    date: "2025-05-18T11:20:00",
    read: false,
    type: "review-required",
    propertyId: mockProperties[1].id,
  },
  {
    id: "4", 
    title: "Price drop alert",
    message: "Price for Prinsengracht 789 has dropped by 5%. This may improve ROI projections.",
    date: "2025-05-17T16:10:00",
    read: true,
    type: "price-change",
    propertyId: mockProperties[2].id,
  },
  {
    id: "5",
    title: "New permit approved",
    message: "Extension permit for Leidsegracht 25 has been approved by the municipality.",
    date: "2025-05-16T10:35:00",
    read: false,
    type: "permit-update",
    propertyId: mockProperties[3].id,
  },
  {
    id: "6",
    title: "Monthly analytics report ready",
    message: "Your May 2025 analytics report is now available for download.",
    date: "2025-05-15T08:15:00",
    read: true,
    type: "report",
    propertyId: null,
  }
];

const mockAlerts = [
  {
    id: "101",
    name: "High Score Properties",
    description: "Notify me when properties score above 80",
    active: true,
    frequency: "Immediately",
    lastTriggered: "2025-05-20T09:30:00"
  },
  {
    id: "102",
    name: "Cap Rate Alert",
    description: "Notify me when cap rate exceeds 5.5%",
    active: true,
    frequency: "Daily",
    lastTriggered: "2025-05-19T08:00:00"
  },
  {
    id: "103",
    name: "Price Drop Monitor",
    description: "Notify me when property prices drop by more than 3%",
    active: false,
    frequency: "Immediately",
    lastTriggered: "2025-05-17T16:10:00"
  },
  {
    id: "104",
    name: "Amsterdam Market Updates",
    description: "Send me market updates for Amsterdam area",
    active: true,
    frequency: "Weekly",
    lastTriggered: "2025-05-14T10:00:00"
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
        ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };
  
  const handleMarkAsRead = () => {
    setNotifications(notifications.map(notification => 
      selectedNotifications.includes(notification.id) ? { ...notification, read: true } : notification
    ));
    setSelectedNotifications([]);
  };
  
  const handleDeleteSelected = () => {
    setNotifications(notifications.filter(notification => 
      !selectedNotifications.includes(notification.id)
    ));
    setSelectedNotifications([]);
  };
  
  const toggleAlertActive = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, active: !alert.active } : alert
    ));
  };
  
  const getNotificationTypeIcon = (type: string) => {
    switch(type) {
      case 'high-score':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );
      case 'market-update':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M3 3v18h18"/>
              <path d="m19 9-5 5-4-4-3 3"/>
            </svg>
          </div>
        );
      case 'review-required':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
        );
      case 'price-change':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
        );
      case 'permit-update':
        return (
          <div className="bg-teal-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
        );
      case 'report':
        return (
          <div className="bg-indigo-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <line x1="10" y1="9" x2="8" y2="9"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <Card className="card-gradient border-gold-100">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-gold-800">Notifications</CardTitle>
                  <p className="text-muted-foreground mt-1">Stay updated on property insights and alerts</p>
                </div>
                {selectedNotifications.length > 0 && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleMarkAsRead}
                      className="border-gold-200 hover:bg-gold-50 hover:text-gold-700"
                    >
                      Mark as Read
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDeleteSelected}
                      className="border-gold-200 hover:bg-gold-50 hover:text-gold-700"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4 bg-gold-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">
                    All
                    <Badge className="ml-2 bg-gold-100 text-gold-800 hover:bg-gold-200">{notifications.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">
                    Unread
                    {unreadCount > 0 && (
                      <Badge className="ml-2 bg-gold-100 text-gold-800 hover:bg-gold-200">{unreadCount}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">
                    Alert Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border rounded-lg flex gap-4 items-start ${notification.read ? 'bg-white' : 'bg-gold-50'}`}
                    >
                      <Checkbox 
                        id={`select-${notification.id}`}
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedNotifications([...selectedNotifications, notification.id]);
                          } else {
                            setSelectedNotifications(selectedNotifications.filter(id => id !== notification.id));
                          }
                        }}
                        className="mt-1"
                      />
                      {getNotificationTypeIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-gold-800'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(notification.date)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        {notification.propertyId && (
                          <Button 
                            variant="link" 
                            className="text-gold-600 hover:text-gold-700 p-0 h-auto mt-2"
                            size="sm"
                          >
                            View Property
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="unread" className="space-y-4">
                  {notifications.filter(n => !n.read).length === 0 ? (
                    <div className="text-center py-10">
                      <div className="bg-gold-100 p-4 inline-block rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                          <path d="M2 8c0-2.2.7-4.3 2-6"/>
                          <path d="M22 8a10 10 0 0 0-2-6"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gold-800 mt-4">All caught up!</h3>
                      <p className="text-muted-foreground mt-1">You have no unread notifications</p>
                    </div>
                  ) : (
                    notifications.filter(n => !n.read).map((notification) => (
                      <div 
                        key={notification.id}
                        className="p-4 border rounded-lg bg-gold-50 flex gap-4 items-start"
                      >
                        <Checkbox 
                          id={`select-${notification.id}`}
                          checked={selectedNotifications.includes(notification.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedNotifications([...selectedNotifications, notification.id]);
                            } else {
                              setSelectedNotifications(selectedNotifications.filter(id => id !== notification.id));
                            }
                          }}
                          className="mt-1"
                        />
                        {getNotificationTypeIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gold-800">
                              {notification.title}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          {notification.propertyId && (
                            <Button 
                              variant="link" 
                              className="text-gold-600 hover:text-gold-700 p-0 h-auto mt-2"
                              size="sm"
                            >
                              View Property
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="alerts">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gold-800">Alert Configuration</h3>
                      <Button 
                        className="bg-gold-500 hover:bg-gold-600 text-white"
                        size="sm"
                      >
                        Add New Alert
                      </Button>
                    </div>
                    
                    {alerts.map((alert) => (
                      <div key={alert.id} className="p-4 border border-gold-100 rounded-lg bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gold-800">{alert.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${alert.active ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {alert.active ? 'Active' : 'Inactive'}
                            </span>
                            <div className="w-12 h-6 ml-2 rounded-full bg-gray-200 flex items-center p-1 cursor-pointer"
                              onClick={() => toggleAlertActive(alert.id)}
                            >
                              <div className={`w-4 h-4 rounded-full transition-transform ${alert.active ? 'bg-green-600 transform translate-x-6' : 'bg-gray-400'}`} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Frequency:</span> {alert.frequency}
                            </div>
                            <div>
                              <span className="font-medium">Last triggered:</span> {formatDate(alert.lastTriggered)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-gold-200 hover:bg-gold-50 hover:text-gold-700"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-gold-200 hover:bg-gold-50 hover:text-gold-700"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h3 className="font-semibold text-gold-800 mb-4">Notification Preferences</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gold-100 rounded-lg bg-white">
                          <h4 className="font-medium text-gold-800">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground mt-1">Receive notifications via email</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="email-daily" defaultChecked />
                              <label htmlFor="email-daily" className="text-sm">Daily Digest</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="email-immediate" defaultChecked />
                              <label htmlFor="email-immediate" className="text-sm">Immediate Alerts</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="email-weekly" defaultChecked />
                              <label htmlFor="email-weekly" className="text-sm">Weekly Report</label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gold-100 rounded-lg bg-white">
                          <h4 className="font-medium text-gold-800">Browser Notifications</h4>
                          <p className="text-sm text-muted-foreground mt-1">Receive notifications in your browser</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="browser-property" defaultChecked />
                              <label htmlFor="browser-property" className="text-sm">Property Updates</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="browser-market" />
                              <label htmlFor="browser-market" className="text-sm">Market Updates</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="browser-system" defaultChecked />
                              <label htmlFor="browser-system" className="text-sm">System Notifications</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-4 border-t border-gold-100 bg-white">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 PropWise Horizon Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotificationsPage;
