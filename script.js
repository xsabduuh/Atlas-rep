// ========== قائمة الطعام ==========
const MENU_ITEMS = [
  // ... (كما هو)
];

// ========== المتغيرات العامة ==========
let cart = JSON.parse(localStorage.getItem('atlasCart')) || {};
let lastAddedItem = null;
let deliveryMethod = 'delivery';
const deliveryLabels = { delivery:'توصيل للمنزل', pickup:'استلام من المحل', dinein:'أكل في المحل' };
let currentFilter = 'all';
let customizationItem = null;
let customizationExtras = {};
let orderHistory = JSON.parse(localStorage.getItem('atlasOrderHistory')) || [];

// ========== تفعيل الوضع المحفوظ (Light/Dark) - يعدل الكلاس فقط ==========
(function loadTheme() {
  const savedTheme = localStorage.getItem('atlasTheme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }
})();

// ========== دوال مساعدة ==========
function saveCart() { localStorage.setItem('atlasCart', JSON.stringify(cart)); }

function updateCartUI() {
  // ... (كما هو)
}

function showToast(msg, undo = false, actions = []) {
  // ... (كما هو)
}

function addToCart(id, extras = {}) {
  // ... (كما هو)
}

function updateCartItem(id, delta) {
  // ... (كما هو)
}

function undoLastAdd() { if (lastAddedItem) { updateCartItem(lastAddedItem, -1); lastAddedItem = null; } }

function openCustomization(itemId) {
  // ... (كما هو)
}

function updateCustomizationTotal() {
  // ... (كما هو)
}

window.handleImageError = function(img, icon) {
  img.style.display = 'none';
  const fb = img.parentElement.querySelector('.item-image-fallback');
  if (fb) fb.style.display = 'flex';
};

function zoomImage(src) { 
  document.getElementById('zoomedImage').src = src; 
  document.getElementById('imageZoomOverlay').classList.add('active'); 
}

function openCartDrawer() { 
  document.getElementById('overlay').classList.add('active'); 
  document.getElementById('cartDrawer').classList.add('active'); 
}
function closeCartDrawer() { 
  document.getElementById('overlay').classList.remove('active'); 
  document.getElementById('cartDrawer').classList.remove('active'); 
}

function openOrderForm() {
  // ... (كما هو)
}

function closeOrderForm() { 
  document.getElementById('orderFormModal').classList.remove('active'); 
}

function initDeliveryOptions() {
  // ... (كما هو)
}

function validateForm() {
  // ... (كما هو)
}

function confirmOrder() {
  // ... (كما هو)
}

function reorderLast() {
  // ... (كما هو)
}

function initFilters() {
  // ... (كما هو)
}

function updateOfferBannerBasedOnTime() {
  // ... (كما هو)
}

function updateProgressBar() {
  // ... (كما هو)
}

function toggleScrollTop() { 
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 300); 
}

// ========== دالة عرض المنيو ==========
function renderMenu(filter = currentFilter) {
  // ... (كما هو)
}

// ========== التهيئة عند تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', function() {
  renderMenu();
  updateCartUI();
  initFilters();
  initDeliveryOptions();
  updateOfferBannerBasedOnTime();

  // مستمعات الأحداث للعناصر الثابتة
  document.getElementById('cartButton').addEventListener('click', openCartDrawer);
  document.getElementById('floatingCart').addEventListener('click', openCartDrawer);
  document.getElementById('closeDrawerBtn').addEventListener('click', closeCartDrawer);
  document.getElementById('overlay').addEventListener('click', closeCartDrawer);
  document.getElementById('checkoutBtn').addEventListener('click', openOrderForm);
  document.getElementById('backToCartBtn').addEventListener('click', () => { closeOrderForm(); openCartDrawer(); });
  document.getElementById('backFromFormBtn').addEventListener('click', () => { closeOrderForm(); openCartDrawer(); });
  document.getElementById('closeZoomBtn').addEventListener('click', () => document.getElementById('imageZoomOverlay').classList.remove('active'));
  document.getElementById('imageZoomOverlay').addEventListener('click', e => { if (e.target === document.getElementById('imageZoomOverlay')) document.getElementById('imageZoomOverlay').classList.remove('active'); });
  document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('confirmOrderBtn').addEventListener('click', confirmOrder);
  document.getElementById('reorderBtn').addEventListener('click', reorderLast);
  document.getElementById('locationBtn')?.addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          document.getElementById('customerAddress').value = 'تم تحديد موقعك (الإحداثيات: ' + position.coords.latitude + ', ' + position.coords.longitude + ')';
        },
        error => alert('تعذر الحصول على الموقع: ' + error.message)
      );
    } else alert('المتصفح لا يدعم تحديد الموقع');
  });

  // مستمع حدث للتغيير على خيارات التخصيص
  document.getElementById('customizationOptions').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') updateCustomizationTotal();
  });

  document.getElementById('customizationModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('customizationModal')) {
      document.getElementById('customizationModal').classList.remove('active');
    }
  });

  document.getElementById('addCustomization').addEventListener('click', () => {
    if (customizationItem) {
      addToCart(customizationItem.id, customizationExtras);
      document.getElementById('customizationModal').classList.remove('active');
    }
  });

  document.getElementById('cancelCustomization').addEventListener('click', () => {
    document.getElementById('customizationModal').classList.remove('active');
  });

  // ========== زر الوضع الليلي/النهاري مع حفظ الحالة ==========
  const themeToggle = document.getElementById('themeToggle');
  
  // مزامنة الأيقونة مع الحالة المحفوظة
  const savedTheme = localStorage.getItem('atlasTheme');
  themeToggle.textContent = savedTheme === 'light' ? '🌑' : '🌓';

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme');
    const isLight = document.documentElement.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '🌑' : '🌓';
    localStorage.setItem('atlasTheme', isLight ? 'light' : 'dark');
  });

  // ========== مستمع حدث للنقر على الأزرار الديناميكية (محسّن) ==========
  const menuContainer = document.getElementById('menuCategories');
  menuContainer.addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (button) {
      if (button.classList.contains('quick-add')) {
        const id = button.dataset.id;
        if (id) addToCart(id);
        e.preventDefault();
      } else if (button.classList.contains('btn-plus')) {
        const id = button.dataset.id;
        if (id) openCustomization(id);
        e.preventDefault();
      } else if (button.classList.contains('btn-minus')) {
        const id = button.dataset.id;
        const delta = parseInt(button.dataset.delta);
        if (id && !isNaN(delta)) updateCartItem(id, delta);
        e.preventDefault();
      }
      return;
    }

    const itemName = e.target.closest('.item-name');
    if (itemName) {
      const id = itemName.dataset.id;
      if (id) openCustomization(id);
      e.preventDefault();
    }
  });

  // تحديث الكميات بشكل دوري
  setInterval(() => {
    for (const id in cart) {
      const el = document.getElementById(`qty-${id}`);
      if (el) el.textContent = cart[id].qty;
    }
  }, 100);

  window.addEventListener('scroll', () => { updateProgressBar(); toggleScrollTop(); });
});

// تصدير الدوال المهمة إلى النطاق العام
window.addToCart = addToCart;
window.updateCartItem = updateCartItem;
window.undoLastAdd = undoLastAdd;
window.zoomImage = zoomImage;
window.openCustomization = openCustomization;
window.updateCustomizationTotal = updateCustomizationTotal;