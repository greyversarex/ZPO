import { db } from "./db";
import { products, branches, banners, news } from "@shared/schema";
import { siteContent } from "../client/src/data/content";

async function seed() {
  console.log("Starting database seed...");

  try {
    // Seed products
    console.log("Seeding products...");
    const productsToInsert = siteContent.products.services.map((product, index) => ({
      nameTj: product.title,
      nameRu: null,
      nameEn: null,
      descriptionTj: product.description,
      descriptionRu: null,
      descriptionEn: null,
      category: "services",
      imageUrl: null,
      sortOrder: index,
      isActive: true,
    }));

    await db.insert(products).values(productsToInsert);
    console.log(`Inserted ${productsToInsert.length} products`);

    // Seed branches
    console.log("Seeding branches...");
    const branchesToInsert = siteContent.about.branches.map((branch, index) => {
      const coords = branch.mapUrl.match(/q=([\d.]+),([\d.]+)/);
      const latitude = coords ? coords[1] : "0";
      const longitude = coords ? coords[2] : "0";

      return {
        nameTj: branch.name,
        nameRu: null,
        nameEn: null,
        cityTj: branch.city,
        cityRu: null,
        cityEn: null,
        descriptionTj: branch.description,
        descriptionRu: null,
        descriptionEn: null,
        addressTj: null,
        addressRu: null,
        addressEn: null,
        phone: null,
        email: null,
        latitude,
        longitude,
        mapUrl: branch.mapUrl,
        sortOrder: index,
        isActive: true,
      };
    });

    await db.insert(branches).values(branchesToInsert);
    console.log(`Inserted ${branchesToInsert.length} branches`);

    // Seed banners
    console.log("Seeding banners...");
    const bannersToInsert = [
      {
        titleTj: "Барқарорсозии ҳаракат – Таъмини ҳаёти шоиста",
        titleRu: "Восстановление движения – Обеспечение достойной жизни",
        titleEn: "Restoring Movement – Ensuring a Dignified Life",
        subtitleTj: "Истеҳсоли протезҳо, воситаҳои ортопедӣ ва тавонбахшии маъюбон дар сатҳи давлатӣ",
        subtitleRu: "Производство протезов, ортопедических изделий и реабилитация инвалидов на государственном уровне",
        subtitleEn: "Manufacturing prosthetics, orthopedic devices and rehabilitation of people with disabilities at the state level",
        imageUrl: "/uploads/banner1.jpg",
        buttonTextTj: "Маълумоти бештар",
        buttonTextRu: "Подробнее",
        buttonTextEn: "Learn More",
        buttonLink: "/patients",
        sortOrder: 0,
        isActive: true,
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
      {
        titleTj: "Технологияҳои муосир дар хизмати шумо",
        titleRu: "Современные технологии на службе вашего здоровья",
        titleEn: "Modern Technologies at Your Service",
        subtitleTj: "Истифодаи усулҳои навтарин барои истеҳсоли протезҳо ва воситаҳои ортопедӣ",
        subtitleRu: "Использование новейших методов производства протезов и ортопедических изделий",
        subtitleEn: "Using the latest methods for manufacturing prosthetics and orthopedic devices",
        imageUrl: "/uploads/banner2.jpg",
        buttonTextTj: "Хизматҳои мо",
        buttonTextRu: "Наши услуги",
        buttonTextEn: "Our Services",
        buttonLink: "/products",
        sortOrder: 1,
        isActive: true,
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
      {
        titleTj: "Дастгирии давлатӣ барои ҳар як беморон",
        titleRu: "Государственная поддержка для каждого пациента",
        titleEn: "Government Support for Every Patient",
        subtitleTj: "Хизматрасонии ройгон ба маъюбон тибқи қонунгузории Ҷумҳурии Тоҷикистон",
        subtitleRu: "Бесплатное обслуживание инвалидов согласно законодательству Республики Таджикистан",
        subtitleEn: "Free services for people with disabilities according to the legislation of the Republic of Tajikistan",
        imageUrl: "/uploads/banner3.jpg",
        buttonTextTj: "Тамос бо мо",
        buttonTextRu: "Связаться с нами",
        buttonTextEn: "Contact Us",
        buttonLink: "/contacts",
        sortOrder: 2,
        isActive: true,
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
    ];

    await db.insert(banners).values(bannersToInsert);
    console.log(`Inserted ${bannersToInsert.length} banners`);

    // Seed news
    console.log("Seeding news...");
    const newsToInsert = [
      {
        titleTj: "Рӯзи байналмилалии маъюбон дар корхона қайд карда шуд",
        titleRu: "Международный день инвалидов отмечен на предприятии",
        titleEn: "International Day of Persons with Disabilities celebrated at the facility",
        contentTj: "Дар рӯзи 3-юми декабр дар Заводи протезию ортопедӣ чорабинии тантанавӣ ба ифтихори Рӯзи байналмилалии маъюбон баргузор гардид. Дар ин чорабинӣ роҳбарони вазоратҳо, намояндагони ҷамоатҳои маъюбон ва кормандони корхона иштирок доштанд. Директори завод дар бораи дастовардҳои соли ҷорӣ ва нақшаҳои минбаъда маълумот дод.",
        contentRu: "3 декабря на Заводе протезно-ортопедических изделий состоялось торжественное мероприятие, посвященное Международному дню инвалидов. В мероприятии приняли участие руководители министерств, представители организаций инвалидов и сотрудники предприятия. Директор завода рассказал о достижениях текущего года и планах на будущее.",
        contentEn: "On December 3rd, the Prosthetic and Orthopedic Plant held a ceremonial event in honor of the International Day of Persons with Disabilities. The event was attended by ministry officials, representatives of disability organizations, and plant employees. The plant director spoke about the achievements of the current year and future plans.",
        excerptTj: "Чорабинии тантанавӣ ба ифтихори Рӯзи байналмилалии маъюбон баргузор гардид",
        excerptRu: "Торжественное мероприятие в честь Международного дня инвалидов",
        excerptEn: "Ceremonial event in honor of the International Day of Persons with Disabilities",
        imageUrl: "/uploads/news_disability_day.jpg",
        isActive: true,
        publishedAt: new Date("2024-12-03"),
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
      {
        titleTj: "Таҷҳизоти нави итолиёвӣ ба кор даромад",
        titleRu: "Введено в эксплуатацию новое итальянское оборудование",
        titleEn: "New Italian equipment put into operation",
        contentTj: "Заводи протезию ортопедӣ таҷҳизоти навтарини итолиёвиро барои истеҳсоли протезҳои сифатнок ба кор даровард. Ин таҷҳизот имконият медиҳад, ки протезҳои индивидуалии замонавӣ тайёр карда шаванд. Сармоягузорӣ бо дастгирии Ҳукумати Ҷумҳурии Тоҷикистон анҷом дода шуд.",
        contentRu: "Завод протезно-ортопедических изделий ввел в эксплуатацию новейшее итальянское оборудование для производства качественных протезов. Это оборудование позволяет изготавливать современные индивидуальные протезы. Инвестиции осуществлены при поддержке Правительства Республики Таджикистан.",
        contentEn: "The Prosthetic and Orthopedic Plant has put into operation the latest Italian equipment for manufacturing quality prosthetics. This equipment allows for the production of modern individual prosthetics. The investment was made with the support of the Government of the Republic of Tajikistan.",
        excerptTj: "Таҷҳизоти навтарини итолиёвӣ барои истеҳсоли протезҳо",
        excerptRu: "Новейшее итальянское оборудование для производства протезов",
        excerptEn: "Latest Italian equipment for prosthetics production",
        imageUrl: "/uploads/news_equipment.jpg",
        isActive: true,
        publishedAt: new Date("2024-11-15"),
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
      {
        titleTj: "Семинари омӯзишӣ барои мутахассисон баргузор шуд",
        titleRu: "Проведен обучающий семинар для специалистов",
        titleEn: "Training seminar held for specialists",
        contentTj: "Дар Заводи протезию ортопедӣ семинари омӯзишӣ барои мутахассисони соҳаи тавонбахшӣ баргузор гардид. Дар семинар мутахассисони Олмон ва Русия ширкат варзиданд ва таҷрибаи худро мубодила карданд. Иштирокчиён бо усулҳои навтарини тавонбахшии маъюбон шинос шуданд.",
        contentRu: "На Заводе протезно-ортопедических изделий состоялся обучающий семинар для специалистов в области реабилитации. В семинаре приняли участие специалисты из Германии и России, которые поделились своим опытом. Участники ознакомились с новейшими методами реабилитации инвалидов.",
        contentEn: "A training seminar for rehabilitation specialists was held at the Prosthetic and Orthopedic Plant. Specialists from Germany and Russia participated in the seminar and shared their experience. Participants learned about the latest methods of rehabilitation for people with disabilities.",
        excerptTj: "Семинар барои мутахассисони соҳаи тавонбахшӣ",
        excerptRu: "Семинар для специалистов в области реабилитации",
        excerptEn: "Seminar for rehabilitation specialists",
        imageUrl: "/uploads/news_seminar.jpg",
        isActive: true,
        publishedAt: new Date("2024-10-20"),
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
      {
        titleTj: "Филиали нав дар Хуҷанд кушода шуд",
        titleRu: "Открыт новый филиал в Худжанде",
        titleEn: "New branch opened in Khujand",
        contentTj: "Дар шаҳри Хуҷанд филиали нави Заводи протезию ортопедӣ кушода шуд. Ин филиал ба сокинони вилояти Суғд имконият медиҳад, ки бе рафтан ба Душанбе протезҳо ва воситаҳои ортопедӣ гиранд. Дар маросими кушоиш раиси вилоят иштирок дошт.",
        contentRu: "В городе Худжанде открыт новый филиал Завода протезно-ортопедических изделий. Этот филиал позволит жителям Согдийской области получать протезы и ортопедические изделия без поездки в Душанбе. В церемонии открытия принял участие председатель области.",
        contentEn: "A new branch of the Prosthetic and Orthopedic Plant has been opened in Khujand. This branch will allow residents of Sughd region to receive prosthetics and orthopedic devices without traveling to Dushanbe. The regional chairman attended the opening ceremony.",
        excerptTj: "Филиали нав барои сокинони вилояти Суғд",
        excerptRu: "Новый филиал для жителей Согдийской области",
        excerptEn: "New branch for residents of Sughd region",
        imageUrl: "/uploads/news_khujand.jpg",
        isActive: true,
        publishedAt: new Date("2024-09-10"),
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
      {
        titleTj: "Ҳамкорӣ бо Созмони Умумиҷаҳонии Тандурустӣ",
        titleRu: "Сотрудничество с Всемирной организацией здравоохранения",
        titleEn: "Cooperation with the World Health Organization",
        contentTj: "Заводи протезию ортопедӣ бо Созмони Умумиҷаҳонии Тандурустӣ созишнома имзо кард. Тибқи ин созишнома, СУТ дастгирии техникӣ ва машваратии корхонаро анҷом медиҳад. Ҳамчунин, барои омӯзиши мутахассисон дар хориҷа грантҳо ҷудо карда мешаванд.",
        contentRu: "Завод протезно-ортопедических изделий подписал соглашение со Всемирной организацией здравоохранения. Согласно этому соглашению, ВОЗ будет оказывать техническую и консультативную поддержку предприятию. Также будут выделены гранты на обучение специалистов за рубежом.",
        contentEn: "The Prosthetic and Orthopedic Plant has signed an agreement with the World Health Organization. According to this agreement, WHO will provide technical and advisory support to the facility. Grants will also be allocated for training specialists abroad.",
        excerptTj: "Созишнома бо СУТ барои дастгирии техникӣ",
        excerptRu: "Соглашение с ВОЗ о технической поддержке",
        excerptEn: "Agreement with WHO for technical support",
        imageUrl: "/uploads/news_who.jpg",
        isActive: true,
        publishedAt: new Date("2024-08-05"),
        cropX: 0,
        cropY: 0,
        cropZoom: 1,
      },
    ];

    await db.insert(news).values(newsToInsert);
    console.log(`Inserted ${newsToInsert.length} news items`);

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
