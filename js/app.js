/**
 * Bilqis Apparel - Main Application Script
 * Galeri Workshop & Katalog Bilqis Apparel, Modal Quick View & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Store
  const state = {
    activeProductModal: null,
    selectedSize: 'M'
  };

  // DOM Elements
  const productsContainer = document.getElementById('productsContainer');
  const modalOverlay = document.getElementById('productModalOverlay');
  const mobileMenuToggle = document.getElementById('hamburgerToggle');
  const navMenu = document.getElementById('navMenu');

  // Initialize App
  init();

  function init() {
    renderGalleryCatalog('all');
    setupEventListeners();
  }

  // Render Galeri Workshop & Katalog Grid Cards
  function renderGalleryCatalog(category = 'all') {
    if (!productsContainer) return;

    let items = BILQIS_DATA.galleryCatalog;
    if (category !== 'all') {
      items = BILQIS_DATA.galleryCatalog.filter(item => item.category === category || item.type === 'workshop');
    }

    if (items.length === 0) {
      productsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
          <i class="ri-search-line" style="font-size: 2.5rem; color: var(--color-gold);"></i>
          <p style="margin-top: 12px; font-weight: 600;">Tidak ada item dalam kategori ini.</p>
        </div>
      `;
      return;
    }

    productsContainer.innerHTML = items.map(item => {
      if (item.type === 'workshop') {
        return `
          <div class="product-card workshop-card" data-id="${item.id}">
            <div class="product-img-wrapper">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
              <span class="product-code-tag" style="background-color: ${item.badgeColor};">
                ${item.badgeText}
              </span>
            </div>
            <div class="product-body" style="justify-content: center; text-align: center; padding: 22px 16px;">
              <h3 class="product-title" style="font-size: 1.1rem; font-weight: 800; color: var(--color-text-dark); margin: 0; height: auto;">
                ${item.title}
              </h3>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="product-card catalog-card" data-id="${item.id}">
            <div class="product-img-wrapper">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
              <span class="product-code-tag" style="background-color: ${item.badgeColor};">
                ${item.badgeText}
              </span>
            </div>
            <div class="product-body" style="padding: 20px;">
              <h3 class="product-title" style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-dark); margin-bottom: 4px; height: auto;">
                ${item.title}
              </h3>
              ${item.subtitle ? `
                <p style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 12px; line-height: 1.4;">
                  ${item.subtitle}
                </p>
              ` : ''}
              <div class="product-actions" style="margin-top: auto;">
                <button class="btn btn-primary btn-detail-modal" data-id="${item.id}" style="width: 100%; border-radius: var(--radius-pill); font-weight: 700;">
                  ${item.btnText || 'Detail Model'}
                </button>
              </div>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Catalog Detail Modal Click
    if (productsContainer) {
      productsContainer.addEventListener('click', (e) => {
        const detailBtn = e.target.closest('.btn-detail-modal');
        if (detailBtn) {
          const itemId = detailBtn.getAttribute('data-id');
          openProductModal(itemId);
        }
      });
    }

    // Modal Close
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    // Mobile Navigation Toggle
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.className = navMenu.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
        }
      });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input && input.value) {
          showToast(`Terima kasih! Email ${input.value} telah terdaftar untuk promo Bilqis Apparel.`);
          input.value = '';
        }
      });
    }
  }

  // Open Product / Model Detail Modal View
  function openProductModal(itemId) {
    let item = BILQIS_DATA.galleryCatalog.find(g => g.id === itemId);
    if (!item) {
      item = BILQIS_DATA.products.find(p => p.id === itemId);
    }
    if (!item || !modalOverlay) return;

    state.activeProductModal = item;
    state.selectedSize = 'M';

    const modalBody = document.getElementById('modalContentContainer');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="modal-grid">
          <div class="modal-img-wrapper">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="modal-details">
            <span class="product-code-tag" style="background-color: ${item.badgeColor}; position: static; display: inline-block; margin-bottom: 8px;">
              ${item.badgeText}
            </span>
            <h2>${item.title}</h2>
            <div class="modal-price">${item.formattedPrice || 'Rp 85.500'}</div>
            <p style="color: var(--color-text-muted); font-size: 0.92rem; margin-bottom: 20px; line-height: 1.6;">
              ${item.subtitle || 'Koleksi busana/konveksi berkualitas buatan Bilqis Apparel Desa Kedali dengan mutu jahitan rapi & pelayanan profesional.'}
            </p>

            <div class="option-group">
              <div class="option-title">Pilih Ukuran</div>
              <div class="chip-options" id="sizeOptionsContainer">
                <div class="chip selected" data-size="S">S</div>
                <div class="chip" data-size="M">M</div>
                <div class="chip" data-size="L">L</div>
                <div class="chip" data-size="XL">XL</div>
                <div class="chip" data-size="XXL">XXL</div>
              </div>
            </div>

            <div style="margin-top: 24px;">
              <button class="btn btn-terracotta" id="modalBuyWaBtn" style="width: 100%;">
                <i class="ri-whatsapp-line"></i> Pesan via WhatsApp
              </button>
            </div>
          </div>
        </div>
      `;

      // Size Selection Handler
      const sizeContainer = document.getElementById('sizeOptionsContainer');
      if (sizeContainer) {
        sizeContainer.addEventListener('click', (e) => {
          const chip = e.target.closest('.chip');
          if (!chip) return;
          sizeContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          state.selectedSize = chip.getAttribute('data-size');
        });
      }

      // Modal Direct Buy WA
      document.getElementById('modalBuyWaBtn').addEventListener('click', () => {
        sendDirectWhatsAppOrder(item, state.selectedSize);
      });
    }

    modalOverlay.classList.add('active');
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  // Direct WhatsApp Order Generator
  function sendDirectWhatsAppOrder(item, size = 'M') {
    const title = item.title || item.name;
    const code = item.badgeText || '#FE730';
    const price = item.formattedPrice || 'Rp 85.500';

    const textMessage = `Halo Bilqis Apparel! 👋%0ASaya berminat untuk memesan/konsultasi produk pakaian berikut:%0A%0A*Produk:* ${title}%0A*Kode:* ${code}%0A*Harga:* ${price}%0A*Ukuran:* ${size}%0A%0AMohon info ketersediaan stok dan prosedur pemesanannya. Terima kasih!`;

    const url = `https://wa.me/${BILQIS_DATA.storeInfo.whatsappNumber}?text=${textMessage}`;
    window.open(url, '_blank');
  }

  // Toast Notification System
  function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: var(--color-gold); font-size: 1.2rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
