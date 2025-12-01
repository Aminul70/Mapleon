import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, X, Plus, Trash2, MapPin as MapPinIcon, Image as ImageIcon, Camera } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ImageUploadField } from '../components/form/ImageUploadField';
import { TextInputField } from '../components/form/TextInputField';
import { TextareaField } from '../components/form/TextareaField';
import { SelectField } from '../components/form/SelectField';
import { TimePickerField } from '../components/form/TimePickerField';
import { ToggleSwitchField } from '../components/form/ToggleSwitchField';
import { MultiSelectField } from '../components/form/MultiSelectField';
import { Button } from '../components/Button';
import { PhotoActionModal } from '../components/PhotoActionModal';
import { saveBusinessProfile, loadBusinessProfile } from '../utils/localStorage';
import { mockBusinesses } from '../utils/mockData';
import { Phone, Globe, Mail } from 'lucide-react';

// Map click handler component
function LocationMarker({ position, setPosition }: { position: LatLng; setPosition: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return <Marker position={position} />;
}

export function BusinessProfileEdit() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'location' | 'images' | 'hours' | 'details'>('basic');
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved data or use mock data
  const [formData, setFormData] = useState(() => {
    const saved = loadBusinessProfile();
    return saved || {
      ...mockBusinesses[0],
      tagline: mockBusinesses[0].description || '',
      operatingHours: {
        Monday: { open: '09:00', close: '17:00', closed: false },
        Tuesday: { open: '09:00', close: '17:00', closed: false },
        Wednesday: { open: '09:00', close: '17:00', closed: false },
        Thursday: { open: '09:00', close: '17:00', closed: false },
        Friday: { open: '09:00', close: '17:00', closed: false },
        Saturday: { open: '10:00', close: '16:00', closed: false },
        Sunday: { open: '', close: '', closed: true },
      },
      customAmenities: [],
      socialMedia: {},
      services: [],
      is24x7: false,
      temporarilyClosed: false,
    };
  });

  const [mapPosition, setMapPosition] = useState<LatLng>(
    new LatLng(formData.location.lat, formData.location.lng)
  );

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [formData]);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update location from map
    const updatedData = {
      ...formData,
      location: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
      },
    };
    
    const success = saveBusinessProfile(updatedData);
    
    setIsSaving(false);
    
    if (success) {
      setHasUnsavedChanges(false);
      alert('✅ Profile saved successfully!');
      navigate('/business-profile');
    } else {
      alert('❌ Error saving profile. Please try again.');
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/business-profile');
      }
    } else {
      navigate('/business-profile');
    }
  };

  // Add service
  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      image: '',
    };
    updateField('services', [...(formData.services || []), newService]);
  };

  const updateService = (index: number, field: string, value: any) => {
    const services = [...(formData.services || [])];
    services[index] = { ...services[index], [field]: value };
    updateField('services', services);
  };

  const removeService = (index: number) => {
    const services = (formData.services || []).filter((_: any, i: number) => i !== index);
    updateField('services', services);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'contact', label: 'Contact' },
    { id: 'location', label: 'Location' },
    { id: 'images', label: 'Images' },
    { id: 'hours', label: 'Hours' },
    { id: 'details', label: 'Details' },
  ];

  const categoryOptions = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'gym', label: 'Gym' },
    { value: 'salon', label: 'Salon' },
    { value: 'cafe', label: 'Cafe' },
    { value: 'service', label: 'Service' },
  ];

  const priceRangeOptions = [
    { value: '$', label: '$ - Budget' },
    { value: '$$', label: '$$ - Moderate' },
    { value: '$$$', label: '$$$ - Upscale' },
    { value: '$$$$', label: '$$$$ - Luxury' },
  ];

  const commonAmenities = [
    'WiFi', 'Parking', 'Wheelchair Accessible', 'Pet Friendly',
    'Outdoor Seating', 'Takeout', 'Delivery', 'Credit Cards',
    'Air Conditioning', 'Reservations', 'Family Friendly', 'Live Music'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-neutral-900">Edit Business Profile</h1>
              {hasUnsavedChanges && (
                <p className="text-xs text-orange-600">Unsaved changes</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowPreview(true)}
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Preview</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save size={16} />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-primary-brand'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-brand" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-4 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Basic Information</h2>
            
            <TextInputField
              label="Business Name"
              value={formData.name}
              onChange={(value) => updateField('name', value)}
              placeholder="Enter business name"
              maxLength={50}
              required
            />

            <SelectField
              label="Category"
              value={formData.category}
              onChange={(value) => updateField('category', value)}
              options={categoryOptions}
              required
            />

            <TextInputField
              label="Tagline/Slogan"
              value={formData.tagline || ''}
              onChange={(value) => updateField('tagline', value)}
              placeholder="Short catchy tagline"
              maxLength={100}
            />

            <TextareaField
              label="Description"
              value={formData.description}
              onChange={(value) => updateField('description', value)}
              placeholder="Tell customers about your business"
              maxLength={300}
              rows={4}
              required
            />

            <SelectField
              label="Price Range"
              value={formData.priceRange || ''}
              onChange={(value) => updateField('priceRange', value)}
              options={priceRangeOptions}
            />
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-4 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Contact Information</h2>

            <TextInputField
              label="Phone Number"
              value={formData.phone || ''}
              onChange={(value) => updateField('phone', value)}
              placeholder="+1 (555) 123-4567"
              type="tel"
              icon={Phone}
              required
            />

            <TextInputField
              label="Email Address"
              value={formData.email || ''}
              onChange={(value) => updateField('email', value)}
              placeholder="contact@business.com"
              type="email"
              icon={Mail}
              required
            />

            <TextInputField
              label="Website URL"
              value={formData.website || ''}
              onChange={(value) => updateField('website', value)}
              placeholder="https://www.business.com"
              type="url"
              icon={Globe}
            />

            <TextareaField
              label="Address"
              value={formData.address || ''}
              onChange={(value) => updateField('address', value)}
              placeholder="Street, City, State, ZIP"
              rows={3}
              required
            />
          </div>
        )}

        {/* Location Tab */}
        {activeTab === 'location' && (
          <div className="space-y-4 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Location</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Set Location on Map
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Click on the map to set your business location
              </p>
              <div className="h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                <MapContainer
                  center={mapPosition}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <LocationMarker position={mapPosition} setPosition={setMapPosition} />
                </MapContainer>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p>Latitude: {mapPosition.lat.toFixed(6)}</p>
                <p>Longitude: {mapPosition.lng.toFixed(6)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            {/* Profile & Cover Photos - Facebook Style Layout */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Cover Photo Section */}
              <div className="relative h-48 bg-gradient-to-r from-primary-brand/20 via-secondary-teal/20 to-secondary-purple/20">
                {(formData.coverImage || formData.image) ? (
                  <>
                    <img
                      src={formData.coverImage || formData.image}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Add Cover Photo</p>
                    </div>
                  </div>
                )}
                {/* Cover Photo Actions */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e: any) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => updateField('coverImage', reader.result);
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                    className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-700 rounded-lg text-sm font-medium hover:bg-white shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Camera size={16} />
                    <span>{(formData.coverImage || formData.image) ? 'Change' : 'Upload'} Cover</span>
                  </button>
                  {(formData.coverImage || formData.image) && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Remove cover photo?')) {
                          updateField('coverImage', '');
                        }
                      }}
                      className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-red-600 rounded-lg text-sm font-medium hover:bg-white shadow-md transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Picture Section - Overlaying */}
              <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="inline-block">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-white shadow-lg flex items-center justify-center">
                        <ImageIcon size={48} className="text-gray-500" />
                      </div>
                    )}
                    {/* Edit Button on Profile Picture */}
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e: any) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => updateField('profileImage', reader.result);
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                      className="absolute bottom-1 right-1 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all"
                    >
                      <Camera size={18} className="text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-business-badge rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">i</div>
                  <div className="text-xs text-orange-800">
                    <p><strong>Profile Picture:</strong> Your business logo - Square format, 400x400px or larger</p>
                    <p className="mt-1"><strong>Cover Photo:</strong> Main banner - 1200x400px recommended</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Photo Gallery
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Up to 20 photos - Showcase your products, services, or ambiance
                  </p>
                </div>
                <span className="text-xs font-medium text-primary-brand bg-primary-brand/10 px-3 py-1 rounded-full">
                  {(formData.photos || []).length}/20
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(formData.photos || []).map((photo: string, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Gallery ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-xl flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          const photos = [...(formData.photos || [])];
                          photos.splice(index, 1);
                          updateField('photos', photos);
                        }}
                        className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {(!formData.photos || formData.photos.length < 20) && (
                  <button
                    type="button"
                    onClick={() => {
                      const newPhoto = prompt('Enter image URL:');
                      if (newPhoto) {
                        updateField('photos', [...(formData.photos || []), newPhoto]);
                      }
                    }}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-brand hover:bg-gradient-to-br hover:from-primary-brand/5 hover:to-secondary-teal/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-primary-brand/10 rounded-full flex items-center justify-center transition-colors">
                      <Plus size={24} className="text-gray-400 group-hover:text-primary-brand transition-colors" />
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-primary-brand font-medium transition-colors">Add Photo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hours Tab */}
        {activeTab === 'hours' && (
          <div className="space-y-4 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Operating Hours</h2>

            <ToggleSwitchField
              label="24/7 Operation"
              value={formData.is24x7 || false}
              onChange={(value) => updateField('is24x7', value)}
              description="Business is always open"
            />

            <ToggleSwitchField
              label="Temporarily Closed"
              value={formData.temporarilyClosed || false}
              onChange={(value) => updateField('temporarilyClosed', value)}
              description="Mark business as temporarily closed"
            />

            {!formData.is24x7 && !formData.temporarilyClosed && (
              <div className="space-y-3">
                {daysOfWeek.map((day) => {
                  const hours = formData.operatingHours?.[day] || { open: '', close: '', closed: false };
                  return (
                    <div key={day} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-neutral-900">{day}</span>
                        <ToggleSwitchField
                          label="Closed"
                          value={hours.closed}
                          onChange={(value) => {
                            updateNestedField('operatingHours', day, {
                              ...hours,
                              closed: value,
                            });
                          }}
                        />
                      </div>
                      {!hours.closed && (
                        <div className="grid grid-cols-2 gap-3">
                          <TimePickerField
                            label="Opening Time"
                            value={hours.open}
                            onChange={(value) => {
                              updateNestedField('operatingHours', day, {
                                ...hours,
                                open: value,
                              });
                            }}
                          />
                          <TimePickerField
                            label="Closing Time"
                            value={hours.close}
                            onChange={(value) => {
                              updateNestedField('operatingHours', day, {
                                ...hours,
                                close: value,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Business Details</h2>

            <MultiSelectField
              label="Amenities"
              selectedValues={formData.amenities || []}
              onChange={(values) => updateField('amenities', values)}
              options={commonAmenities}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Links
              </label>
              <div className="space-y-3">
                <TextInputField
                  label="Instagram"
                  value={formData.socialMedia?.instagram || ''}
                  onChange={(value) => updateNestedField('socialMedia', 'instagram', value)}
                  placeholder="@username"
                />
                <TextInputField
                  label="Facebook"
                  value={formData.socialMedia?.facebook || ''}
                  onChange={(value) => updateNestedField('socialMedia', 'facebook', value)}
                  placeholder="facebook.com/page"
                />
                <TextInputField
                  label="Twitter"
                  value={formData.socialMedia?.twitter || ''}
                  onChange={(value) => updateNestedField('socialMedia', 'twitter', value)}
                  placeholder="@username"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Services/Menu Items
                </label>
                <Button variant="secondary" size="sm" onClick={addService}>
                  <Plus size={16} />
                  Add Service
                </Button>
              </div>
              <div className="space-y-3">
                {(formData.services || []).map((service: any, index: number) => (
                  <div key={service.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Service {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <TextInputField
                        label="Name"
                        value={service.name}
                        onChange={(value) => updateService(index, 'name', value)}
                        placeholder="Service name"
                      />
                      <TextareaField
                        label="Description"
                        value={service.description}
                        onChange={(value) => updateService(index, 'description', value)}
                        placeholder="Service description"
                        rows={2}
                      />
                      <TextInputField
                        label="Price ($)"
                        value={service.price.toString()}
                        onChange={(value) => updateService(index, 'price', parseFloat(value) || 0)}
                        placeholder="0.00"
                        type="text"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-900">Profile Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <img
                  src={formData.profileImage}
                  alt={formData.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h2 className="text-2xl font-bold text-neutral-900">{formData.name}</h2>
                {formData.tagline && (
                  <p className="text-gray-600 italic mt-1">{formData.tagline}</p>
                )}
                <p className="text-neutral-700 mt-2">{formData.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                {formData.amenities && formData.amenities.length > 0 && (
                  <div>
                    <strong>Amenities:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.amenities.map((amenity: string) => (
                        <span key={amenity} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
