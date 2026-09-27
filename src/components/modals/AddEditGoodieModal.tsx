import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Goodie,
  GoodieType,
  GoodieCategory,
  GoodieCondition,
  ApparelSize,
  ExchangeMode,
} from '../../types';
import {
  X,
  Repeat,
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  Image as ImageIcon,
  Tag,
  MapPin,
} from 'lucide-react';

const CATEGORIES: GoodieCategory[] = [
  'T-Shirt',
  'Hoodie',
  'Jacket',
  'Sticker',
  'Mug',
  'Bottle',
  'Cap',
  'Bag',
  'Notebook',
  'Pin',
  'Badge',
  'Tech Accessory',
  'Other',
];

const EVENTS = [
  'Google I/O',
  'AWS re:Invent',
  'GitHub Universe',
  'GDG DevFest',
  'Microsoft Build',
  'KubeCon',
  'Config',
  'DockerCon',
  'RustConf',
  'React Summit',
  'Hackathons',
  'Other Meetup',
];

const PRESET_PHOTOS = [
  {
    name: 'Google I/O Tee',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNRJLIm7NMLsmuY1f9Q_ACiW5Ga3HBaRH3Hd9Qh_E_RssnelRZKovOYd4vyq41UB_uUGBQHhYcxOJkbQtt8Ubr3-mRA3uktUSHgp_tg8fJ9BUNzRtNSQgoc8rJV4DxDFJT7i0bTyFi7qbO2WKUG9Xhznr0aQXSuCbxpRXD-WAZIu3cRg5M2eWSUyHxL7flm7N7qPNfD-SpKZQ0gZKoIZDLUVcfaiJlfgXHnqnPMOG60nGRSY7O1-tn',
  },
  {
    name: 'KubeCon Fleece Hoodie',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJ2x0BZCQS46mV2kvmPZWM2qDacdl2A1v3gZwHAgIqEIMpoj_1wYsYpc5jByGSvSBlOzINg5DBhBPNN0IKB15CVa1Z1w5TnjC4yuu9Lol3CW-U7PeTMeVfvU5OgM2SaykSJgtVHdFlG6M5P3PO0lIiTbZsbhynOucSCg2A9PgZ3KmnzaDU7V9AM52NTJsSOG1kBxYYOR5hUc-dviQGeebFxqbU3Yj55pyLeOcgi-rrRWWEDZUbpID',
  },
  {
    name: 'AWS re:Invent Insulated Bottle',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4IQo4RU62GUOonSZPtOQYSWVaO61tgwcz4Ekrb2E6f6Uq76534_5uptAjuYyisutswyOWrBWgNie6FvZnLRiU2F283S8GenJGtS8qHMS8QovLin7xy1OQER50XP1Xl6LCCs9-F98_V1x2UWTF5jgRyOtD8HwGh-FZmG9X6WT1Tfpld47GaBnoDYAaGGRFDeyOlIW6hgHdAleoySvVK6YeQwuVq4FxtosY-IWyVzUqo8rNHYmL59c',
  },
  {
    name: 'Holographic Sticker Pack',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0Ooz1NrICYlF19-UirqtP37mt_c91Kr3n1xUYjUHDIeMrZW5mRXR2bbyfrc6zBQ9yGJv2E1r1RFPmYPYy5FGByigNKgi706dfHVb7EWMci1nQYd6VUERYbYW5fLzhWcxPz88_dO8XKYwptOaBy7HsT0gDBrABeaFhIyE4a6KM7lLnDElLKP4OekKLFB6E7h4nl1LIznTzf42fWO-SNY5DRjRsu7szQw-buXb88wri735JVlfkcjsQ',
  },
  {
    name: 'DockerCon Whale Dad Cap',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlgS5s1dCKnGsSRFy98gPLMq_7BUrumQE4EPf0nb5YbRp_jDFF7IUhw5mMf7KWiFAVUHVCEFAAaITfkFcM7E5Ehhc3Cq5ycQcJ2ee3cEToDQMlIPR8WxyhFt9BNNt4UDzsfvBC7n0YwZUItjpO3y25ANnqputWAgU9lZxE5uMwMS2a23gDPTzVbnS7f4VGlAjlcOEm7EghLYoLSFUzjXkusX1tdUa69zsDXKYdLxtiUCyMC6NBUENq',
  },
  {
    name: 'Figma Config Keycaps & Pin',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgKs8gkJ48A-SiPCzXtDCgqI-wTn0ntopzqZi41tdDBC-AhZcOgpmawiMew8ns7UuYLIvG29VMP6FhL48BfMze63TUWrRjH2xxCli3s38tl2Xo-slAiMhxM6GbVYuXItHWm6r7NY6o4lZ3Eoq2Boz7fWE3vZK0_3dq3mcX-P6OFQ4tQu8mSfkkIWrOrXsiFRs-wrmxTMTvZThknkLhBokckooEkKuQ1afL5ClrzFuMsEqjNBzNzn7c',
  },
  {
    name: 'Canvas Heavyweight Tote',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwVgeHgKSGDqvVAq7Cv7NRMYwc4WhroemxREjAsc8IAZ9iV_PHoL2pwuE2x9suNi586oVhOImCB9M7kv9lSn4MoPH-Mz7ac5ZXIaanSYDGv2-nwF_aFhnL8OAgK4LKMZKqUCJSIotOT5vdwQPMPEoLX6ANGfirkHcWWWrxmqnjTtFeV9WjdoXCmDwlUOveyhmRF92kFxvllLUnMDbe0P8HH4oaTZeP_TkWotc1qjLVQszQpIRUjSt3',
  },
  {
    name: 'HackMIT Commuter Backpack',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJmpZ979VR9eimNgaISZsKdtNUx6kJ8pwUSxigGjuajiQoh1q8v8yKQDYuiHHC39rhCbmbvgmlLDTzdDaeROTwAYq1KKNKdmCt7VPau_TFXc4yuaTsB-64uUR67LKZbnDY4_vFyA2PoyyHssqxN-iKJJB7GUeBuVMVM62NBdiNCH78bf0oNmo4ZiLGetftjzwS6GrHiDJo-YF9UI3FDb7XGTKi6pboUI4obPBJnoPoMT3PrTHh9Ucl',
  },
];

export const AddEditGoodieModal: React.FC = () => {
  const {
    isAddGoodieModalOpen,
    setIsAddGoodieModalOpen,
    goodieToEdit,
    closeEditGoodieModal,
    addGoodie,
    updateGoodie,
    currentUser,
  } = useApp();

  const isEditing = Boolean(goodieToEdit);
  const isOpen = isAddGoodieModalOpen || isEditing;

  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GoodieCategory>('T-Shirt');
  const [event, setEvent] = useState('Google I/O');
  const [organization, setOrganization] = useState('Google');
  const [year, setYear] = useState<number>(2025);
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<GoodieCondition>('Mint / Brand New');
  const [size, setSize] = useState<ApparelSize>('L');
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('Both');
  const [city, setCity] = useState(currentUser.city || 'San Francisco, CA');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(PRESET_PHOTOS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');

  // Step 2 Fields
  const [type, setType] = useState<GoodieType>('barter');
  const [wishlist, setWishlist] = useState('');
  const [targetCategories, setTargetCategories] = useState<GoodieCategory[]>(['Hoodie', 'Tech Accessory']);
  const [giverNote, setGiverNote] = useState('');

  // Populate when editing
  useEffect(() => {
    if (goodieToEdit) {
      setTitle(goodieToEdit.title);
      setCategory(goodieToEdit.category);
      setEvent(goodieToEdit.event);
      setOrganization(goodieToEdit.organization);
      setYear(goodieToEdit.year);
      setDescription(goodieToEdit.description);
      setCondition(goodieToEdit.condition);
      setSize(goodieToEdit.size || 'L');
      setExchangeMode(goodieToEdit.exchangeMode);
      setCity(goodieToEdit.city);
      setSelectedPhoto(goodieToEdit.images[0] || PRESET_PHOTOS[0].url);
      setType(goodieToEdit.type);
      setWishlist(goodieToEdit.wishlist || '');
      setTargetCategories(goodieToEdit.targetCategories || ['Hoodie']);
      setGiverNote(goodieToEdit.giverNote || '');
    } else {
      resetForm();
    }
    setStep(1);
  }, [goodieToEdit, isAddGoodieModalOpen]);

  const resetForm = () => {
    setTitle('');
    setCategory('T-Shirt');
    setEvent('Google I/O');
    setOrganization('Google');
    setYear(2025);
    setDescription('');
    setCondition('Mint / Brand New');
    setSize('L');
    setExchangeMode('Both');
    setCity(currentUser.city || 'San Francisco, CA');
    setSelectedPhoto(PRESET_PHOTOS[0].url);
    setCustomPhotoUrl('');
    setType('barter');
    setWishlist('');
    setTargetCategories(['Hoodie']);
    setGiverNote('');
    setStep(1);
  };

  const handleClose = () => {
    if (isEditing) {
      closeEditGoodieModal();
    } else {
      setIsAddGoodieModalOpen(false);
    }
    resetForm();
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImage = customPhotoUrl.trim() || selectedPhoto;

    if (isEditing && goodieToEdit) {
      updateGoodie(goodieToEdit.id, {
        title,
        category,
        event,
        organization,
        year,
        description,
        condition,
        size: ['T-Shirt', 'Hoodie', 'Jacket', 'Cap'].includes(category) ? size : undefined,
        exchangeMode,
        city,
        images: [finalImage],
        type,
        wishlist: type !== 'give' ? wishlist : undefined,
        targetCategories: type !== 'give' ? targetCategories : undefined,
        giverNote: type !== 'barter' ? giverNote : undefined,
      });
    } else {
      addGoodie({
        title,
        category,
        event,
        organization,
        year,
        description,
        condition,
        size: ['T-Shirt', 'Hoodie', 'Jacket', 'Cap'].includes(category) ? size : undefined,
        exchangeMode,
        city,
        images: [finalImage],
        type,
        wishlist: type !== 'give' ? wishlist : undefined,
        targetCategories: type !== 'give' ? targetCategories : undefined,
        giverNote: type !== 'barter' ? giverNote : undefined,
      });
    }

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {isEditing ? 'Editing Goodie' : 'Share Conference Gear'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs font-medium text-slate-500">
                Step {step} of 2
              </span>
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
              {step === 1 ? 'Goodie Information' : 'Exchange Mode & Wishlist'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: GOODIE INFORMATION */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Goodie Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Google I/O 2024 Neon Cyber T-Shirt"
                className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GoodieCategory)}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Conference / Event *
                </label>
                <select
                  value={event}
                  onChange={(e) => {
                    setEvent(e.target.value);
                    if (e.target.value === 'Google I/O') setOrganization('Google');
                    else if (e.target.value === 'AWS re:Invent') setOrganization('AWS');
                    else if (e.target.value === 'GitHub Universe') setOrganization('GitHub');
                    else if (e.target.value === 'KubeCon') setOrganization('CNCF');
                  }}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  {EVENTS.map((ev) => (
                    <option key={ev} value={ev}>
                      {ev}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Google, CNCF, GitHub"
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Event Year *
                </label>
                <input
                  type="number"
                  min={2015}
                  max={2027}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as GoodieCondition)}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none"
                >
                  <option value="Mint / Brand New">Mint / Brand New</option>
                  <option value="Brand New in Box">Brand New in Box</option>
                  <option value="Like New (Unworn)">Like New (Unworn)</option>
                  <option value="Gently Used">Gently Used</option>
                </select>
              </div>
            </div>

            {/* Size for Apparel */}
            {['T-Shirt', 'Hoodie', 'Jacket', 'Cap'].includes(category) && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Apparel Size
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {(['XS', 'S', 'M', 'L', 'XL', '2XL', 'Universal'] as ApparelSize[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSize(sz)}
                      className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all ${
                        size === sz
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe fabric, fit, tags, or any story from the event..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none resize-none"
              />
            </div>

            {/* Select Swag Photo from Authentic Swag Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Choose Product Photo
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2">
                {PRESET_PHOTOS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPhoto(p.url);
                      setCustomPhotoUrl('');
                    }}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhoto === p.url && !customPhotoUrl
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    {selectedPhoto === p.url && !customPhotoUrl && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow-md" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={customPhotoUrl}
                onChange={(e) => setCustomPhotoUrl(e.target.value)}
                placeholder="Or paste custom image URL..."
                className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            {/* Location & Exchange mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Location (City Level Only)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Exchange Mode
                </label>
                <select
                  value={exchangeMode}
                  onChange={(e) => setExchangeMode(e.target.value as ExchangeMode)}
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700 focus:outline-none"
                >
                  <option value="Both">Both Shipping & In-Person Meetup</option>
                  <option value="Shipping">Shipping Only</option>
                  <option value="Local Meetup">Local Meetup Only</option>
                </select>
              </div>
            </div>

            {/* Bottom Proceed Button */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: WHAT DO YOU WANT TO DO? (BARTER VS GIVE) */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                What do you want to do with this goodie?
              </label>

              {/* Large Selectable Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* 1. Barter */}
                <button
                  type="button"
                  onClick={() => setType('barter')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    type === 'barter'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                      <Repeat className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      🔄 Barter
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      "I want to exchange this goodie for another goodie."
                    </p>
                  </div>
                  {type === 'barter' && (
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}
                </button>

                {/* 2. Give */}
                <button
                  type="button"
                  onClick={() => setType('give')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    type === 'give'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      🎁 Give
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      "I have an extra goodie and want to give it to someone."
                    </p>
                  </div>
                  {type === 'give' && (
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}
                </button>

                {/* 3. Both */}
                <button
                  type="button"
                  onClick={() => setType('both')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    type === 'both'
                      ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 ring-2 ring-sky-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      🔄🎁 Barter or Give
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      "I prefer a barter, but I'm also willing to give it away."
                    </p>
                  </div>
                  {type === 'both' && (
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Conditional Wishlist Fields if Barter is chosen */}
            {(type === 'barter' || type === 'both') && (
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-4">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <Repeat className="w-4 h-4 text-amber-600" />
                  <span>What are you looking for in return?</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Swag Categories:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Hoodie', 'T-Shirt', 'Jacket', 'Pin', 'Cap', 'Tech Accessory', 'Bottle'].map((cat) => {
                      const isSel = targetCategories.includes(cat as GoodieCategory);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              setTargetCategories(targetCategories.filter((c) => c !== cat));
                            } else {
                              setTargetCategories([...targetCategories, cat as GoodieCategory]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                            isSel
                              ? 'bg-amber-600 text-white font-semibold shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Free-Text Wishlist Description
                  </label>
                  <input
                    type="text"
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                    placeholder="e.g. Seeking KubeCon 2024 fleece (L/XL) or artisan mechanical keycaps"
                    className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-amber-200 dark:border-amber-800 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Conditional Giver Note if Give is chosen */}
            {(type === 'give' || type === 'both') && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <Gift className="w-4 h-4 text-emerald-600" />
                  <span>Giveaway Preferences (No return item required!)</span>
                </div>
                <input
                  type="text"
                  value={giverNote}
                  onChange={(e) => setGiverNote(e.target.value)}
                  placeholder="e.g. Free to a junior developer, student, or first-time open source contributor"
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-emerald-200 dark:border-emerald-800 focus:outline-none"
                />
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <span>{isEditing ? 'Save Changes' : 'Publish Goodie to Feed'}</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
