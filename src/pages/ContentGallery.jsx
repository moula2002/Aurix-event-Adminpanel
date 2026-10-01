import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, X, Upload, Edit2 } from 'lucide-react';

export default function ContentGallery() {
  const [images, setImages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newHeading, setNewHeading] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [newCategory, setNewCategory] = useState('Corporate Events');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('https://aurix-event-server.onrender.com/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error(err));
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setNewHeading(item.title);
      setNewCategory(item.category || 'Corporate Events');
      setNewFile(null);
    } else {
      setEditingId(null);
      setNewHeading('');
      setNewCategory('Corporate Events');
      setNewFile(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewHeading('');
    setNewFile(null);
    setEditingId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (newHeading && (newFile || editingId)) {
      const formData = new FormData();
      formData.append('title', newHeading);
      formData.append('category', newCategory);
      if (newFile) formData.append('image', newFile);

      try {
        if (editingId) {
          const res = await fetch(`https://aurix-event-server.onrender.com/api/gallery/${editingId}`, {
            method: 'PUT',
            body: formData
          });
          const updatedItem = await res.json();
          setImages(images.map(img => img._id === editingId ? updatedItem : img));
        } else {
          const res = await fetch('https://aurix-event-server.onrender.com/api/gallery', {
            method: 'POST',
            body: formData
          });
          const newItem = await res.json();
          setImages([newItem, ...images]);
        }
        handleCloseModal();
      } catch (err) {
        console.error('Save failed:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://aurix-event-server.onrender.com/api/gallery/${id}`, { method: 'DELETE' });
      setImages(images.filter(img => img._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Content Gallery</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </button>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-1">No images yet</h3>
          <p className="text-slate-500">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group">
              <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={item.imageBase64 || (item.imageUrl && item.imageUrl.startsWith('/') ? `https://aurix-event-server.onrender.com${item.imageUrl}` : `https://via.placeholder.com/400x300?text=${item.title.replace(' ', '+')}`)} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button 
                    onClick={() => handleOpenModal(item)}
                    className="p-2 bg-white/20 hover:bg-blue-500 rounded-full text-white backdrop-blur-sm transition-colors"
                    title="Edit Image"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-white/20 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-slate-800 truncate" title={item.title}>{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Image' : 'Upload New Image'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image Heading</label>
                <input 
                  type="text"
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                  placeholder="e.g. Wedding Reception"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Conferences">Conferences</option>
                  <option value="Exhibitions">Exhibitions</option>
                  <option value="Activations">Activations</option>
                  <option value="Brand Launches">Brand Launches</option>
                  <option value="Live Events">Live Events</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Image</label>
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-1 text-center">
                    {newFile ? (
                      <div className="text-sm text-slate-600 font-medium">{newFile.name}</div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                          <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        {editingId ? (
                          <p className="text-xs text-amber-500 font-medium mt-1">Leave blank to keep current image</p>
                        ) : (
                          <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  required={!editingId}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!newHeading || (!newFile && !editingId)}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
