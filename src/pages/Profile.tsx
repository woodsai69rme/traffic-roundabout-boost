
import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, User } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize form data with user metadata
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
    username: user?.user_metadata?.username || user?.user_metadata?.preferred_username || '',
    email: user?.email || '',
    bio: user?.user_metadata?.bio || '',
    website: user?.user_metadata?.website || '',
    location: user?.user_metadata?.location || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, you would update the user profile here
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      fullName: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
      username: user?.user_metadata?.username || user?.user_metadata?.preferred_username || '',
      email: user?.email || '',
      bio: user?.user_metadata?.bio || '',
      website: user?.user_metadata?.website || '',
      location: user?.user_metadata?.location || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWithAuth />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
            <Button asChild>
              <a href="/auth">Sign In</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userInitials = (formData.fullName || formData.username || user.email || 'User')
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-4xl space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Picture Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage 
                      src={user.user_metadata?.avatar_url} 
                      alt={formData.fullName || formData.username}
                    />
                    <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled={true} // Email should not be editable here
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us a bit about yourself..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Account ID</h3>
                    <p className="text-sm text-muted-foreground">{user.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Member Since</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
