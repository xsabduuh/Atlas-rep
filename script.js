const MENU_ITEMS = [
  { id:'burger1', name:'برغر أطلس الكبير', desc:'لحمة بقري 200غ + جبن شيدر + خس + طماطم + صوص خاص', price:55, icon:'🍔', image:'burger.jpg', badge:{type:'green',text:'◈ الأفضل'}, category:'burgers', categoryAr:'البرغر', time:'15-20 دقيقة' },
  { id:'burger2', name:'برغر دجاج مقرمش', desc:'فيليه دجاج مقرمش + جبن + خس + مايونيز', price:45, icon:'🍔', image:'burger ch.JPG', badge:{type:'gold',text:'✦ جديد'}, category:'burgers', categoryAr:'البرغر', time:'15-20 دقيقة' },
  { id:'burger3', name:'برغر نباتي', desc:'فطيرة نباتية + طماطم + خس + صوص طحينة', price:40, icon:'🥬', image:'burger v.JPG', badge:null, category:'burgers', categoryAr:'البرغر', time:'15-20 دقيقة' },
  { id:'tacos1', name:'تاكوس أطلس', desc:'ورق تاكوس + لحم مفروم + فريت + صوص الڭار', price:38, icon:'🌮', image:'tacos.JPG', badge:{type:'gold',text:'✦ الأكثر مبيعاً'}, category:'tacos', categoryAr:'التاكوس', time:'10-15 دقيقة' },
  { id:'tacos2', name:'تاكوس دجاج', desc:'ورق تاكوس + دجاج + فريت + صوص أبيض', price:35, icon:'🌮', image:'tacos p.JPG', badge:null, category:'tacos', categoryAr:'تاكوس', time:'10-15 دقيقة' },
  { id:'drink1', name:'كوكاكولا', desc:'علبة 33cl مثلجة', price:12, icon:'🥤', image:'coca.JPG', badge:null, category:'drinks', categoryAr:'المشروبات', time:'2 دقيقة' },
  { id:'drink2', name:'فانتا برتقال', desc:'علبة 33cl مثلجة', price:12, icon:'🥤', image:'fanta.JPG', badge:null, category:'drinks', categoryAr:'المشروبات', time:'2 دقيقة' },
  { id:'drink3', name:'ميرندا', desc:'علبة 33cl مثلجة', price:12, icon:'🥤', image:'mirinda.JPG', badge:null, category:'drinks', categoryAr:'المشروبات', time:'2 دقيقة' },
  { id:'dessert1', name:'بسبوسة بالقشطة', desc:'قطعة بسبوسة محشية قشطة', price:5, icon:'🍰', image:'basbosa.JPG', badge:{type:'green',text:'◈ حلو اليوم'}, category:'desserts', categoryAr:'الحلويات', time:'5 دقائق' },
  { id:'dessert2', name:'كنافة ناعمة', desc:'كنافة بالجبن أو القشطة', price:25, icon:'🥮', image:'kunafa.JPG', badge:null, category:'desserts', categoryAr:'الحلويات', time:'10 دقائق' },
  { id:'extra1', name:'بطاطس مقلية', desc:'حجم عائلي مع كاتشب', price:15, icon:'🍟', image:'frites.jpg', badge:null, category:'extras', categoryAr:'إضافات', time:'5 دقائق' },
  { id:'extra2', name:'صوص جبن', desc:'صوص جبن كريمي إضافي', price:5, icon:'🧀', image:'cheese.JPG', badge:null, category:'extras', categoryAr:'إضافات', time:'2 دقيقة' },
  { id:'offer1', name:'عرض البرغر الكبير', desc:'برغر أطلس الكبير + بطاطس + كوكاكولا', price:69, icon:'🍔', image:'offer1.jpg', badge:{type:'red',text:'🔥 عرض'}, category:'offers', categoryAr:'العروض', time:'20-25 دقيقة' },
  { id:'offer2', name:'عرض تاكوس', desc:'تاكوس أطلس + بطاطس + فانتا', price:49, icon:'🌮', image:'offer2.jpg', badge:{type:'red',text:'🔥 عرض'}, category:'offers', categoryAr:'العروض', time:'15-20 دقيقة' }
];

let cart = JSON.parse(localStorage.getItem('atlasCart')) || {};
let lastAddedItem = null;
let deliveryMethod = 'delivery';
const deliveryLabels = { delivery:'توصيل للمنزل', pickup:'استلام من المحل', dinein:'أكل في المحل' };
let currentFilter = 'all';

// الوضع الليلي هو الأساس: نتحقق من عدم وجود تفضيل مخالف فقط
(function initTheme() {
  const savedTheme = localStorage.getItem('atlasTheme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    // إذا لم يكن محفوظاً أو كان dark، نضمن إزالة الكلاس (الليلي هو الافتراضي)
    document.documentElement.classList.remove('light-theme');
    // تأكيد حفظ الحالة كـ dark في المرة الأولى
    if (!savedTheme) localStorage.setItem('atlasTheme', 'dark');
  }
})();

function saveCart() { localStorage.setItem('atlasCart', JSON.stringify(cart)); }

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
          <img src="${imageSrc}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='${icon}';">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
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
}

function showToast(msg, undo = false) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  if (undo) {
    t.innerHTML += ' <span class="toast-undo" onclick="undoLastAdd()">تراجع</span>';
  }
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function addToCart(id) {
  const item = MENU_ITEMS.find(i => i.id === id);
  if (!item) return;
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = {
      name: item.name,
      price: item.price,
      icon: item.icon,
      qty: 1
    };
  }
  lastAddedItem = id;
  saveCart();
  updateCartUI();
  showToast(`✦ ${item.name} تمت الإضافة`, true);
}

function updateCartItem(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  updateCartUI();
  const qtyEl = document.getElementById(`qty-${id}`);
  if (qtyEl) qtyEl.textContent = cart[id] ? cart[id].qty : 0;
}

function undoLastAdd() { if (lastAddedItem) { updateCartItem(lastAddedItem, -1); lastAddedItem = null; } }

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
  window.open(`https://wa.me/212661234567?text=${encodeURIComponent(msg)}`);
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

    cat.items.forEach((item, index) => {
      const qty = cart[item.id]?.qty || 0;
      const badgeClass = item.badge?.type === 'green' ? 'badge-green' : (item.badge?.type === 'red' ? 'badge-red' : 'badge-gold');
      const badgeHtml = item.badge ? `<div class="badge ${badgeClass}">${item.badge.text}</div>` : '';

      const showPrepTime = ['burgers', 'tacos', 'offers'].includes(item.category);
      const timeHtml = showPrepTime && item.time ? `<div class="prep-time">⏱️ ${item.time}</div>` : '';

      const controlsHtml = qty === 0 ? 
        `<button class="quick-add" data-id="${item.id}">إضافة</button>` : 
        `<div class="item-controls">
          <button class="btn-qty btn-minus" data-id="${item.id}" data-delta="-1">−</button>
          <div class="item-qty" id="qty-${item.id}">${qty}</div>
          <button class="btn-qty btn-plus" data-id="${item.id}" data-delta="1">+</button>
        </div>`;

      // تحسين تحميل الصور
      const fetchPriority = item.id === 'burger1' ? 'high' : 'auto';
      const imageHtml = `<div class="item-image" onclick="zoomImage('${item.image}')">
        <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" fetchpriority="${fetchPriority}" onerror="handleImageError(this,'${item.icon}')">
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

document.addEventListener('DOMContentLoaded', function() {
  renderMenu();
  updateCartUI();
  initFilters();
  initDeliveryOptions();
  updateOfferBannerBasedOnTime();

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

  // زر الوضع الليلي/النهاري
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('atlasTheme');
  themeToggle.textContent = savedTheme === 'light' ? '🌑' : '🌓'; // أيقونة معكوسة منطقياً

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme');
    const isLight = document.documentElement.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '🌑' : '🌓';
    localStorage.setItem('atlasTheme', isLight ? 'light' : 'dark');
  });

  // Event delegation للأزرار الديناميكية
  const menuContainer = document.getElementById('menuCategories');
  menuContainer.addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (button) {
      if (button.classList.contains('quick-add')) {
        const id = button.dataset.id;
        if (id) addToCart(id);
      } else if (button.classList.contains('btn-plus')) {
        const id = button.dataset.id;
        if (id) addToCart(id); // في النسخة المبسطة، + يضيف مباشرة
      } else if (button.classList.contains('btn-minus')) {
        const id = button.dataset.id;
        const delta = parseInt(button.dataset.delta);
        if (id && !isNaN(delta)) updateCartItem(id, delta);
      }
      return;
    }

    const itemName = e.target.closest('.item-name');
    if (itemName) {
      const id = itemName.dataset.id;
      if (id) addToCart(id);
    }
  });

  // تحديث الكميات بشكل أقل تواتراً لتقليل الـ lag
  let lastUpdate = 0;
  setInterval(() => {
    const now = Date.now();
    if (now - lastUpdate > 200) { // تحديث كل 200ms فقط إذا كان هناك تغيير
      for (const id in cart) {
        const el = document.getElementById(`qty-${id}`);
        if (el && el.textContent != cart[id].qty) {
          el.textContent = cart[id].qty;
        }
      }
      lastUpdate = now;
    }
  }, 200);

  window.addEventListener('scroll', () => { updateProgressBar(); toggleScrollTop(); });
});

window.addToCart = addToCart;
window.updateCartItem = updateCartItem;
window.undoLastAdd = undoLastAdd;
window.zoomImage = zoomImage;