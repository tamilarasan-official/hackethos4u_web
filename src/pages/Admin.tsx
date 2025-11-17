import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              {/* Courses Management */}
              <TabsContent value="courses" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Courses</h2>
                  <Button className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Sample Course Card */}
                  <Card className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Ethical Hacking Masterclass</h3>
                        <p className="text-muted-foreground mb-4">6-month comprehensive training program</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Duration: 6 months</span>
                          <span>Students: 1250</span>
                          <span>Price: ₹15,000 - ₹40,000</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Add/Edit Course Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">Add New Course</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Course Title</label>
                      <Input placeholder="Enter course title" className="rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Enter course description" className="rounded-2xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <Input placeholder="e.g., 6 months" className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select className="w-full px-4 py-2 rounded-2xl border border-input bg-background">
                          <option>Cybersecurity</option>
                          <option>AR VR</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price Range</label>
                      <Input placeholder="e.g., ₹15,000 - ₹40,000" className="rounded-2xl" />
                    </div>
                    <Button className="rounded-full">Save Course</Button>
                  </form>
                </Card>
              </TabsContent>

              {/* Services Management */}
              <TabsContent value="services" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Services</h2>
                  <Button className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Sample Service Card */}
                  <Card className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">WPAT Testing</h3>
                        <p className="text-muted-foreground">Comprehensive web and mobile application penetration testing</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Add/Edit Service Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">Add New Service</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service Title</label>
                      <Input placeholder="Enter service title" className="rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Enter service description" className="rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Slug</label>
                      <Input placeholder="e.g., wpat-testing" className="rounded-2xl" />
                    </div>
                    <Button className="rounded-full">Save Service</Button>
                  </form>
                </Card>
              </TabsContent>

              {/* Images Management */}
              <TabsContent value="images" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Images</h2>
                  <Button className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Sample Image Card */}
                  <Card className="p-4">
                    <div className="aspect-square bg-secondary/30 rounded-2xl mb-3 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium truncate mb-2">hero-cyber.jpg</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full flex-1">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Upload Image Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">Upload New Image</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image Name</label>
                      <Input placeholder="Enter image name" className="rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image File</label>
                      <Input type="file" className="rounded-2xl" />
                    </div>
                    <Button className="rounded-full">Upload Image</Button>
                  </form>
                </Card>
              </TabsContent>

              {/* Certificates Management */}
              <TabsContent value="certificates" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Certificates</h2>
                  <Button className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certificate
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Sample Certificate Card */}
                  <Card className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">CEH Certified</h3>
                        <p className="text-muted-foreground">Certified Ethical Hacker</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Add/Edit Certificate Form */}
                <Card className="p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">Add New Certificate</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Certificate Name</label>
                      <Input placeholder="Enter certificate name" className="rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Enter certificate description" className="rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image</label>
                      <Input type="file" className="rounded-2xl" />
                    </div>
                    <Button className="rounded-full">Save Certificate</Button>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
