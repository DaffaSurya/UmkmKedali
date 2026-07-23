/**
 * Bilqis Apparel - Data Store
 * Product Catalog, Gallery Workshop & Testimonials Data
 */

const BILQIS_DATA = {
  storeInfo: {
    name: "Bilqis Apparel",
    tagline: "Keanggunan di Setiap Langkah",
    subtitle: "Temukan Gaya Anda dengan Koleksi Pakaian Wanita Berkualitas dari Jantung Desa.",
    whatsappNumber: "6282335785662",
    address: "Desa Kedali, Kec. Pucuk, Kab. Lamongan, Jawa Timur",
    email: "info@bilqisapparel.com",
    phone: "+62 823-3578-5662"
  },
  
  categories: [
    { id: "tunik", title: "Tunik", subtitle: "Koleksi Tunik Modern & Nyaman", image: "assets/tunik_cat.png", count: 12 },
    { id: "jilbab", title: "Jilbab", subtitle: "Hijab Voal Premium Tegak Dahi", image: "assets/jilbab_cat.png", count: 18 },
    { id: "gamis", title: "Gamis", subtitle: "Keanggunan Long Dress Etnik", image: "assets/hero_model.png", count: 15 }
  ],

  galleryCatalog: [
    {
      id: "gal-1",
      title: "Proses Menjahit Presisi",
      subtitle: "",
      category: "tunik",
      badgeColor: "#E67E22",
      badgeText: "#FE730",
      image: "assets/pekerja konveksi 1.jpeg",
      type: "workshop",
      btnText: ""
    },
    {
      id: "gal-2",
      title: "Persiapan Kain & Pola",
      subtitle: "",
      category: "gamis",
      badgeColor: "#F4B400",
      badgeText: "#FE455",
      image: "assets/Pekerja konveksi 2.jpeg",
      type: "workshop",
      btnText: ""
    },
    {
      id: "gal-3",
      title: "Kontrol Kualitas Detail",
      subtitle: "",
      category: "jilbab",
      badgeColor: "#2E7D32",
      badgeText: "#FE770",
      image: "assets/quality control.jpeg",
      type: "workshop",
      btnText: ""
    },
    {
      id: "gal-4",
      title: "Produk Jadi Siap Kirim",
      subtitle: "",
      category: "tunik",
      badgeColor: "#2E7D32",
      badgeText: "#FE48L",
      image: "assets/Produk-jadi.jpeg",
      type: "workshop",
      btnText: ""
    },
  ],

  products: [
    {
      id: "prod-1",
      name: "Tunik Sania Mustard (Katalog)",
      category: "tunik",
      badgeColor: "#E67E22",
      badgeText: "#FE730",
      price: 85500,
      formattedPrice: "Rp 85.500",
      rating: 4.9,
      reviewsCount: 38,
      image: "assets/tunik_cat.png",
      description: "Tunik linen premium hasil produksi konveksi dengan daya serap tinggi, nyaman, dan adem. Diolah secara teliti oleh pengrajin Desa Kedali.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Mustard", "Terracotta", "Forest Green"]
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Muhammad Darrel sunoto",
      location: "Mahasiswa BBK 8 Universitas Airlangga",
      avatar: "assets/darrel.jpeg",
      comment: "Tunik Sania ini kainnya adem banget! Jahitannya sangat rapi khas buatan pengrajin lokal. Sangat nyaman dipakai kerja maupun acara keluarga.",
      rating: 5
    },
    {
      id: 2,
      name: "R Nabila Azwa",
      location: "Mahasiswa BBK 8 Universitas Airlangga",
      avatar: "assets/azwa.jpeg",
      comment: "Bahan dan desain gamisnya kelihatan sangat mewah padahal harganya sangat terjangkau. Respon admin WhatsApp-nya juga cepat dan ramah!",
      rating: 5
    },
    {
      id: 3,
      name: "Aston Martin",
      location: "Mahasiswa BBK 8 Universitas Airlangga",
      avatar: "assets/aston.jpeg",
      comment: "Jilbab voal-nya enak banget dipakai seharian, gak gampang kusut dan tegak rapi di dahi. Bangga sekali dengan produk UMKM Desa Kedali!",
      rating: 5
    }
  ]
};
