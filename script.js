// ========== قائمة الطعام ==========
const MENU_ITEMS = [
  // قسم البرغر
  { 
    id:'burger1', 
    name:'برغر أطلس الكبير', 
    desc:'لحمة بقري 200غ + جبن شيدر + خس + طماطم + صوص خاص', 
    price:55, 
    icon:'🍔', 
    image:'burger.jpg', 
    badge:{type:'green',text:'◈ الأفضل'},
    category:'burgers', 
    categoryAr:'البرغر',
    time:'15-20 دقيقة',
    recommended: ['drink1', 'extra1'],
    customizations: [
      { id: 'cheese', name: 'جبن إضافي', price: 5 },
      { id: 'sauce', name: 'صوص خاص', price: 3 },
      { id: 'onion', name: 'بدون بصل', price: 0 }
    ]
  },
  { 
    id:'burger2',
    name:'برغر دجاج مقرمش', 
    desc:'فيليه دجاج مقرمش + جبن + خس + مايونيز', 
    price:45, 
    icon:'🍔', 
    image:'burger ch.JPG', 
    badge:{type:'gold',text:'✦ جديد'},
    category:'burgers', 
    categoryAr:'البرغر',
    time:'15-20 دقيقة',
    recommended: ['drink2'],
    customizations: [
      { id: 'cheese', name: 'جبن إضافي', price: 5 },
      { id: 'spicy', name: 'صوص حار', price: 2 }
    ]
  },
  { 
    id:'burger3', 
    name:'برغر نباتي', 
    desc:'فطيرة نباتية + طماطم + خس + صوص طحينة', 
    price:40, 
    icon:'🥬', 
    image:'burger v.JPG', 
    badge:null,
    category:'burgers', 
    categoryAr:'البرغر',
    time:'15-20 دقيقة',
    recommended: ['drink3'],
    customizations: [
      { id: 'avocado', name: 'أفوكادو', price: 8 }
    ]
  },

  // قسم تاكوس
  { 
    id:'tacos1', 
    name:'تاكوس أطلس', 
    desc:'ورق تاكوس + لحم مفروم + فريت + صوص الڭار', 
    price:38, 
    icon:'🌮', 
    image:'tacos.JPG', 
    badge:{type:'gold',text:'✦ الأكثر مبيعاً'},
    category:'tacos', 
    categoryAr:'التاكوس',
    time:'10-15 دقيقة',
    recommended: ['drink1'],
    customizations: [
      { id: 'cheese', name: 'جبن', price: 4 },
      { id: 'spicy', name: 'صوص حار', price: 2 }
    ]
  },
  { 
    id:'tacos2', 
    name:'تاكوس دجاج', 
    desc:'ورق تاكوس + دجاج + فريت + صوص أبيض', 
    price:35, 
    icon:'🌮', 
    image:'tacos p.JPG', 
    badge:null,
    category:'tacos', 
    categoryAr:'تاكوس',
    time:'10-15 دقيقة',
    recommended: ['drink2'],
    customizations: [
      { id: 'cheese', name: 'جبن', price: 4 }
    ]
  },

  // قسم المشروبات
  { id:'drink1', name:'كوكاكولا', desc:'علبة 33cl مثلجة', price:12, icon:'🥤', image:'coca.JPG', badge:null, category:'drinks', categoryAr:'المشروبات', time:'2 دقيقة' },
  { id:'drink2', name:'فانتا برتقال', desc:'علبة 33cl مثلجة', price:12, icon:'🥤', image:'fanta.JPG', badge:null, category:'drinks', categoryAr:'المشروبات', time:'2 دقيقة' },
  { id:'drink3', name:'ميرندا', desc:'علبة 33cl مثلجة', price:12, icon:'🥤', image:'mirinda.JPG', badge:null, category:'drinks', categoryAr:'المشروبات', time:'2 دقيقة' },

  // قسم الحلويات
  { id:'dessert1', name:'بسبوسة بالقشطة', desc:'قطعة بسبوسة محشية قشطة', price:5, icon:'🍰', image:'basbosa.JPG', badge:{type:'green',text:'◈ حلو اليوم'}, category:'desserts', categoryAr:'الحلويات', time:'5 دقائق' },
  { id:'dessert2', name:'كنافة ناعمة', desc:'كنافة بالجبن أو القشطة', price:25, icon:'🥮', image:'kunafa.JPG', badge:null, category:'desserts', categoryAr:'الحلويات', time:'10 دقائق' },

  // قسم الإضافات
  { id:'extra1', name:'بطاطس مقلية', desc:'حجم عائلي مع كاتشب', price:15, icon:'🍟', image:'frites.jpg', badge:null, category:'extras', categoryAr:'إضافات', time:'5 دقائق' },
  { id:'extra2', name:'صوص جبن', desc:'صوص جبن كريمي إضافي', price:5, icon:'🧀', image:'cheese.JPG', badge:null, category:'extras', categoryAr:'إضافات', time:'2 دقيقة' },

  // قسم العروض
  { 
    id:'offer1', 
    name:'عرض البرغر الكبير', 
    desc:'برغر أطلس الكبير + بطاطس + كوكاكولا', 
    price:69, 
    icon:'🍔', 
    image:'offer1.jpg', 
    badge:{type:'red',text:'🔥 عرض'},
    category:'offers', 
    categoryAr:'العروض',
    time:'20-25 دقيقة',
    combo: ['burger1', 'extra1', 'drink1'],
    comboPrice: 69
  },
  { 
    id:'offer2', 
    name:'عرض تاكوس', 
    desc:'تاكوس أطلس + بطاطس + فانتا', 
    price:49, 
    icon:'🌮', 
    image:'offer2.jpg', 
    badge:{type:'red',text:'🔥 عرض'},
    category:'offers', 
    categoryAr:'العروض',
    time:'15-20 دقيقة',
    combo: ['tacos1', 'extra1', 'drink2'],
    comboPrice: 49
  }
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

// ========== دوال مساعدة ==========
function saveCart() { 
  localStorage.setItem('atlasCart', JSON.stringify(cart)); 
}

// تحديث واجهة السلة
function updateCartUI() {
  const totalItems = Object.values(cart).reduce((s,i)=>s+i.qty,0);
  const totalPrice = Object.values(cart).reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cartBadge').style.display = totalItems>0?'flex':'none';
  document.getElementById('cartBadge').textContent = totalItems;
  document.getElementById('floatingBadge').textContent = totalItems;
  document.getElementById('cartTotal').textContent = totalPrice;
  const cartDiv = document.getElementById('cartItems');
  if(totalItems===0){ 
    cartDiv.innerHTML='<div class="empty-cart"><div class="empty-cart-icon">◈</div><div>سلتك فارغة</div></div>'; 
    document.getElementById('reorderBtn').style.display = orderHistory.length ? 'block' : 'none';
    return; 
  }
  let html='';
  for(const [id,item] of Object.entries(cart)) {
    const menuItem = MENU_ITEMS.find(m => m.id === id);
    const imageSrc = menuItem?.image || '';
    const icon = menuItem?.icon || '🍽️';
    html+=`
      <div class="cart-item" data-id="${id}">
        <div class="cart-item-icon">
          <img src="${imageSrc}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" onerror="this.style.display='none'; this.parentElement.innerHTML='${icon}';">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name} ${item.customizations ? '(مخصص)' : ''}</div>
          <div class="cart-item-price">${item.price*item.qty} درهم</div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateCartItem('${id}',-1)">−</button>
          <div class="cart-item-qty">${item.qty}</div>
          <button class="cart-qty-btn" onclick="updateCartItem('${id}',1)">+</button>
        </div>
      </div>
    `;
  }
  cartDiv.innerHTML = html;
  document.getElementById('reorderBtn').style.display = orderHistory.length ? 'block' : 'none';
}

// عرض Toast
function showToast(msg, undo = false, actions = []) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  if (undo) {
    t.innerHTML += ' <span class="toast-undo" onclick="undoLastAdd()">تراجع</span>';
  }
  if (actions.length) {
    actions.forEach(action => {
      t.innerHTML += ` <button onclick="${action.handler}">${action.text}</button>`;
    });
  }
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// إضافة منتج للسلة
function addToCart(id, extras = {}) {
  const item = MENU_ITEMS.find(i => i.id === id);
  if (!item) return;
  
  let finalPrice = item.price;
  let extrasText = '';
  if (Object.keys(extras).length) {
    extrasText = ' (مخصص)';
    for (let [key] of Object.entries(extras)) {
      const opt = item.customizations?.find(c => c.id === key);
      if (opt) finalPrice += opt.price;
    }
  }

  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = {
      name: item.name + extrasText,
      price: finalPrice,
      icon: item.icon,
      qty: 1,
      customizations: extras
    };
  }
  lastAddedItem = id;
  saveCart();
  updateCartUI();
  showToast(`✦ ${item.name} تمت الإضافة`, true);

  if (item.recommended?.length) {
    const rec = item.recommended.map(rid => MENU_ITEMS.find(i => i.id === rid)).filter(Boolean);
    if (rec.length) {
      setTimeout(() => {
        showToast('🔄 هل تريد إضافة؟ ' + rec.map(r => r.name).join('، '), false, rec.map(r => ({
          text: r.name,
          handler: `addToCart('${r.id}')`
        })));
      }, 500);
    }
  }
}

// تحديث كمية المنتج
function updateCartItem(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  updateCartUI();
  const qtyEl = document.getElementById(`qty-${id}`);
  if (qtyEl) qtyEl.textContent = cart[id] ? cart[id].qty : 0;
}

function undoLastAdd() { 
  if (lastAddedItem) { 
    updateCartItem(lastAddedItem, -1); 
    lastAddedItem = null; 
  } 
}

// فتح مودال التخصيص
function openCustomization(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  customizationItem = item;
  customizationExtras = {};
  document.getElementById('customizationItemName').textContent = item.name;
  document.getElementById('customizationItemPrice').textContent = `السعر الأساسي: ${item.price} درهم`;
  
  let optionsHtml = '';
  if (item.customizations) {
    item.customizations.forEach(opt => {
      optionsHtml += `
        <div class="customization-option">
          <label>${opt.name} ${opt.price > 0 ? `(+${opt.price} درهم)` : ''}</label>
          <input type="checkbox" data-id="${opt.id}" data-price="${opt.price}">
        </div>
      `;
    });
  } else {
    optionsHtml = '<p class="gray">لا توجد إضافات</p>';
  }
  document.getElementById('customizationOptions').innerHTML = optionsHtml;
  document.getElementById('customizationTotal').textContent = item.price + ' درهم';
  document.getElementById('customizationModal').classList.add('active');
}

// تحديث السعر في المودال
function updateCustomizationTotal() {
  if (!customizationItem) return;
  let total = customizationItem.price;
  const checkboxes = document.querySelectorAll('#customizationOptions input:checked');
  checkboxes.forEach(cb => {
    total += parseInt(cb.dataset.price);
    customizationExtras[cb.dataset.id] = true;
  });
  document.getElementById('customizationTotal').textContent = total + ' درهم';
}

// معالج خطأ الصور
window.handleImageError = function(img, icon) {
  img.style.display = 'none';
  const fb = img.parentElement.querySelector('.item-image-fallback');
  if (fb) fb.style.display = 'flex';
};

function zoomImage(src) { 
  document.getElementById('zoomedImage').src = src; 
  document.getElementById('imageZoomOverlay').classList.add('active'); 
}

// دوال السلة والنماذج
function openCartDrawer() { 
  document.getElementById('overlay').classList.add('active'); 
  document.getElementById('cartDrawer').classList.add('active'); 
}
function closeCartDrawer() { 
  document.getElementById('overlay').classList.remove('active'); 
  document.getElementById('cartDrawer').classList.remove('active'); 
}

function openOrderForm() {
  if (Object.keys(cart).length === 0) return;
  const items = Object.values(cart); 
  const total = items.reduce((s,i) => s + i.price * i.qty, 0);
  const itemsHtml = items.map(i => `<div class="summary-item"><span class="summary-item-name">${i.name} x${i.qty}</span><span class="summary-item-price">${i.price * i.qty} درهم</span></div>`).join('');
  document.getElementById('orderSummary').innerHTML = `<div class="summary-title">✦ ملخص طلبك</div><div class="summary-items">${itemsHtml}</div><div class="summary-total"><div class="summary-total-label">◆ المجموع</div><div class="summary-total-value">${total} درهم</div></div>`;
  closeCartDrawer(); 
  document.getElementById('orderFormModal').classList.add('active');
}

function closeOrderForm() { 
  document.getElementById('orderFormModal').classList.remove('active'); 
}

function initDeliveryOptions() {
  const opts = document.querySelectorAll('.delivery-option');
  opts.forEach(o => o.addEventListener('click', () => {
    opts.forEach(oo => oo.classList.remove('selected'));
    o.classList.add('selected');
    deliveryMethod = o.dataset.value;
    document.getElementById('addressWrap').classList.toggle('show', deliveryMethod === 'delivery');
  }));
}

function validateForm() {
  let ok = true;
  const n = document.getElementById('customerName').value.trim();
  const p = document.getElementById('customerPhone').value.trim();
  const a = document.getElementById('customerAddress').value.trim();

  if (!n) { 
    document.getElementById('customerName').classList.add('error'); 
    document.getElementById('nameError').classList.add('show'); 
    ok = false; 
  } else { 
    document.getElementById('customerName').classList.remove('error'); 
    document.getElementById('nameError').classList.remove('show'); 
  }

  const phoneRegex = /^[0-9]{9,}$/;
  if (!p || !phoneRegex.test(p)) { 
    document.getElementById('customerPhone').classList.add('error'); 
    document.getElementById('phoneError').classList.add('show'); 
    ok = false; 
  } else { 
    document.getElementById('customerPhone').classList.remove('error'); 
    document.getElementById('phoneError').classList.remove('show'); 
  }

  if (deliveryMethod === 'delivery' && !a) { 
    document.getElementById('customerAddress').classList.add('error'); 
    document.getElementById('addressError').classList.add('show'); 
    ok = false; 
  } else { 
    document.getElementById('customerAddress').classList.remove('error'); 
    document.getElementById('addressError').classList.remove('show'); 
  }

  return ok;
}

function confirmOrder() {
  if (!validateForm()) return;
  const n = document.getElementById('customerName').value.trim(), 
        p = document.getElementById('customerPhone').value.trim(), 
        a = document.getElementById('customerAddress').value.trim(), 
        nt = document.getElementById('customerNotes').value.trim();
  const items = Object.values(cart), total = items.reduce((s,i) => s + i.price * i.qty, 0);
  
  let msg = 'السلام عليكم Atlas Snack\n\nطلب جديد:\n';
  items.forEach(i => msg += `- ${i.name} x${i.qty} = ${i.price * i.qty} درهم\n`);
  msg += `\nالمجموع: ${total} درهم\n\nالاسم: ${n}\nالهاتف: ${p}\nالاستلام: ${deliveryLabels[deliveryMethod]}\n`;
  if (deliveryMethod === 'delivery') msg += `العنوان: ${a}\n`;
  if (nt) msg += `ملاحظات: ${nt}\n`;

  const order = { date: new Date().toISOString(), items: { ...cart }, total, customer: n, phone: p, address: a, notes: nt, deliveryMethod };
  orderHistory.push(order);
  localStorage.setItem('atlasOrderHistory', JSON.stringify(orderHistory));

  window.open(`https://wa.me/212661234567?text=${encodeURIComponent(msg)}`);
}

function reorderLast() {
  if (orderHistory.length) {
    const lastOrder = orderHistory[orderHistory.length - 1];
    cart = JSON.parse(JSON.stringify(lastOrder.items));
    saveCart();
    updateCartUI();
    renderMenu(currentFilter);
    showToast('✅ تمت إعادة آخر طلب إلى السلة');
  }
}

function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderMenu(currentFilter);
    });
  });
}

function updateOfferBannerBasedOnTime() {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  const title = isNight ? '🔥 عرض الليلة' : '🔥 عرض اليوم';
  const desc = isNight ? 'تاكوس + بطاطس + مشروب بـ 49 درهم' : 'برغر + بطاطس + مشروب بـ 69 درهم';
  const tag = isNight ? 'وفر 25%' : 'وفر 20%';
  document.getElementById('offerTitle').textContent = title;
  document.getElementById('offerDesc').textContent = desc;
  document.getElementById('offerTag').textContent = tag;
}

function updateProgressBar() {
  const s = document.documentElement.scrollTop, 
        h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById('progressBar').style.width = (s / h * 100) + '%';
}

function toggleScrollTop() { 
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 300); 
}

// ========== دالة عرض المنيو (بدون onclick) ==========
function renderMenu(filter = currentFilter) {
  const container = document.getElementById('menuCategories');
  container.innerHTML = '';

  const categories = {};
  MENU_ITEMS.forEach(item => {
    if (filter !== 'all' && item.category !== filter) return;
    if (!categories[item.category]) {
      categories[item.category] = {
        nameAr: item.categoryAr,
        items: []
      };
    }
    categories[item.category].items.push(item);
  });

  for (let catKey in categories) {
    categories[catKey].items.sort((a, b) => {
      if (a.badge && !b.badge) return -1;
      if (!a.badge && b.badge) return 1;
      return 0;
    });
  }

  const categoryOrder = ['offers', 'burgers', 'tacos', 'drinks', 'desserts', 'extras'];

  categoryOrder.forEach(catKey => {
    const cat = categories[catKey];
    if (!cat) return;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'category-title';
    titleDiv.textContent = cat.nameAr;
    container.appendChild(titleDiv);

    const gridDiv = document.createElement('div');
    gridDiv.className = 'items-grid';

    cat.items.forEach((item) => {
      const qty = cart[item.id]?.qty || 0;
      const badgeClass = item.badge?.type === 'green' ? 'badge-green' : (item.badge?.type === 'red' ? 'badge-red' : 'badge-gold');
      const badgeHtml = item.badge ? `<div class="badge ${badgeClass}">${item.badge.text}</div>` : '';

      const showPrepTime = ['burgers', 'tacos', 'offers'].includes(item.category);
      const timeHtml = showPrepTime && item.time ? `<div class="prep-time">⏱️ ${item.time}</div>` : '';

      // الأزرار تستخدم data-id و data-delta
      const controlsHtml = qty === 0 ? 
        `<button class="quick-add" data-id="${item.id}">إضافة</button>` : 
        `<div class="item-controls">
          <button class="btn-qty btn-minus" data-id="${item.id}" data-delta="-1">−</button>
          <div class="item-qty" id="qty-${item.id}">${qty}</div>
          <button class="btn-qty btn-plus" data-id="${item.id}" data-delta="1">+</button>
        </div>`;

      const imageHtml = `<div class="item-image skeleton" onclick="zoomImage('${item.image}')">
        <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" fetchpriority="${item.id === 'burger1' ? 'high' : 'auto'}" onerror="handleImageError(this,'${item.icon}')" onload="this.parentElement.classList.remove('skeleton')">
        <div class="item-image-fallback" id="fallback-${item.id}">${item.icon}</div>
      </div>`;

      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        ${timeHtml}
        ${imageHtml}
        <div class="item-content">
          <div class="item-badges">${badgeHtml}</div>
          <div class="item-name" data-id="${item.id}">${item.name}</div>
          <div class="item-desc">${item.desc}</div>
          <div class="item-footer">
            <div class="item-price">${item.price} <small>درهم</small></div>
            ${controlsHtml}
          </div>
        </div>
      `;
      gridDiv.appendChild(card);
    });

    container.appendChild(gridDiv);
  });
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

  // مستمع حدث للنقر على الأزرار الديناميكية داخل #menuCategories (event delegation)
  const menuContainer = document.getElementById('menuCategories');
  menuContainer.addEventListener('click', function(e) {
    const target = e.target;

    // زر الإضافة السريعة: يضيف المنتج مباشرة للسلة
    if (target.classList.contains('quick-add')) {
      const id = target.dataset.id;
      if (id) addToCart(id);
    }

    // زر + : يفتح مودال التخصيص (لأنه قد يرغب في إضافة إضافات)
    if (target.classList.contains('btn-plus')) {
      const id = target.dataset.id;
      if (id) openCustomization(id);
    }

    // زر - : يقلل الكمية مباشرة
    if (target.classList.contains('btn-minus')) {
      const id = target.dataset.id;
      const delta = parseInt(target.dataset.delta);
      if (id && !isNaN(delta)) updateCartItem(id, delta);
    }

    // اسم المنتج: يفتح مودال التخصيص
    if (target.classList.contains('item-name')) {
      const id = target.dataset.id;
      if (id) openCustomization(id);
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

// تصدير الدوال المهمة إلى النطاق العام (للأزرار الثابتة)
window.addToCart = addToCart;
window.updateCartItem = updateCartItem;
window.undoLastAdd = undoLastAdd;
window.zoomImage = zoomImage;
window.openCustomization = openCustomization;
window.updateCustomizationTotal = updateCustomizationTotal;