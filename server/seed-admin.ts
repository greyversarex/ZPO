import { db } from "./db";
import { banners, news, admins } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding banners, news and admin...");

  // Create default admin
  const existingAdmin = await db.select().from(admins).limit(1);
  if (existingAdmin.length === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(admins).values({
      username: "admin",
      password: hashedPassword
    });
    console.log("Created default admin: admin / admin123");
  } else {
    console.log("Admin already exists");
  }

  // Check if banners exist
  const existingBanners = await db.select().from(banners).limit(1);
  if (existingBanners.length === 0) {
    await db.insert(banners).values([
      {
        titleTj: "Барқарорсозии ҳаракат – Таъмини ҳаёти шоиста",
        titleRu: "Восстановление движения – Обеспечение достойной жизни",
        titleEn: "Restoring Movement – Ensuring a Dignified Life",
        subtitleTj: "Истеҳсоли протезҳо, воситаҳои ортопедӣ ва тавонбахшии маъюбон дар сатҳи давлатӣ",
        subtitleRu: "Производство протезов, ортопедических изделий и реабилитация инвалидов на государственном уровне",
        subtitleEn: "Production of prosthetics, orthopedic devices and rehabilitation of disabled people at the state level",
        buttonTextTj: "Маълумоти бештар",
        buttonTextRu: "Подробнее",
        buttonTextEn: "Learn More",
        buttonLink: "/patients",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
        sortOrder: 0,
        isActive: true
      },
      {
        titleTj: "Хизматрасонии ройгон барои маъюбон",
        titleRu: "Бесплатные услуги для инвалидов",
        titleEn: "Free Services for Disabled Citizens",
        subtitleTj: "Мувофиқи қарори Ҳукумат №604, маъюбони гурӯҳи I ва II, кӯдакони то 18-сола ва ветеранҳо хизматрасонии ройгон мегиранд",
        subtitleRu: "Согласно постановлению Правительства №604, инвалиды I и II группы, дети до 18 лет и ветераны получают бесплатные услуги",
        subtitleEn: "According to Government Resolution No. 604, disabled persons of groups I and II, children under 18 and veterans receive free services",
        buttonTextTj: "Тамос бо мо",
        buttonTextRu: "Свяжитесь с нами",
        buttonTextEn: "Contact Us",
        buttonLink: "/contacts",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80",
        sortOrder: 1,
        isActive: true
      },
      {
        titleTj: "Технологияҳои муосир дар тавонбахшӣ",
        titleRu: "Современные технологии в реабилитации",
        titleEn: "Modern Technologies in Rehabilitation",
        subtitleTj: "Ҷорӣ намудани усулҳои нави тавонбахшӣ ва истифодаи таҷҳизоти муосир",
        subtitleRu: "Внедрение новых методов реабилитации и использование современного оборудования",
        subtitleEn: "Implementing new rehabilitation methods and using modern equipment",
        buttonTextTj: "Маҳсулот",
        buttonTextRu: "Продукция",
        buttonTextEn: "Products",
        buttonLink: "/products",
        imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&q=80",
        sortOrder: 2,
        isActive: true
      }
    ]);
    console.log("Created 3 banners");
  } else {
    console.log("Banners already exist");
  }

  // Check if news exist
  const existingNews = await db.select().from(news).limit(1);
  if (existingNews.length === 0) {
    await db.insert(news).values([
      {
        titleTj: "Навсозии таҷҳизот дар сексияи протезӣ",
        titleRu: "Обновление оборудования в протезном цехе",
        titleEn: "Equipment Upgrade in the Prosthetics Workshop",
        contentTj: "Корхонаи давлатии заводи протезию ортопедии шаҳри Душанбе бо дастгирии Вазорати меҳнат ва шуғли аҳолии Ҷумҳурии Тоҷикистон таҷҳизоти навро дар сексияи протезӣ насб кард. Ин таҷҳизот имконият медиҳад, ки протезҳои сифатнок ва муосир истеҳсол карда шаванд.",
        contentRu: "Государственное предприятие протезно-ортопедический завод города Душанбе при поддержке Министерства труда и занятости населения Республики Таджикистан установило новое оборудование в протезном цехе. Это оборудование позволяет производить качественные и современные протезы.",
        contentEn: "The State Enterprise Prosthetic and Orthopedic Plant of Dushanbe city, with the support of the Ministry of Labor and Employment of the Republic of Tajikistan, installed new equipment in the prosthetics workshop. This equipment allows the production of high-quality and modern prosthetics.",
        excerptTj: "Таҷҳизоти нав барои истеҳсоли протезҳои сифатнок насб карда шуд.",
        excerptRu: "Установлено новое оборудование для производства качественных протезов.",
        excerptEn: "New equipment installed for the production of high-quality prosthetics.",
        imageUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80",
        isActive: true,
        publishedAt: new Date("2024-11-15")
      },
      {
        titleTj: "Семинар оид ба усулҳои нави тавонбахшӣ",
        titleRu: "Семинар по новым методам реабилитации",
        titleEn: "Seminar on New Rehabilitation Methods",
        contentTj: "Корхонаи мо семинари омӯзишии се-рӯзаро барои мутахассисони сексияи тавонбахшӣ баргузор намуд. Дар ин семинар усулҳои нави тавонбахшии физикӣ ва истифодаи таҷҳизоти муосир омӯхта шуданд.",
        contentRu: "Наше предприятие провело трёхдневный обучающий семинар для специалистов отдела реабилитации. На семинаре были изучены новые методы физической реабилитации и использование современного оборудования.",
        contentEn: "Our enterprise held a three-day training seminar for specialists of the rehabilitation department. The seminar covered new methods of physical rehabilitation and the use of modern equipment.",
        excerptTj: "Семинари се-рӯза барои мутахассисони тавонбахшӣ баргузор гардид.",
        excerptRu: "Проведён трёхдневный семинар для специалистов реабилитации.",
        excerptEn: "A three-day seminar was held for rehabilitation specialists.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80",
        isActive: true,
        publishedAt: new Date("2024-11-10")
      },
      {
        titleTj: "Дидори директор бо маъюбони филиали Хуҷанд",
        titleRu: "Встреча директора с инвалидами филиала Худжанд",
        titleEn: "Director's Meeting with Disabled Persons at Khujand Branch",
        contentTj: "Директори генералии корхона Муҳаббатов Зафар Ҳукумович ба филиали Хуҷанд сафар карда, бо маъюбоне, ки хизматрасонӣ мегиранд, вохӯрӣ гузаронид. Дар ин вохӯрӣ масъалаҳои беҳтар намудани хизматрасонӣ муҳокима шуданд.",
        contentRu: "Генеральный директор предприятия Мухаббатов Зафар Хукумович посетил филиал в Худжанде и провёл встречу с инвалидами, получающими услуги. На встрече обсуждались вопросы улучшения обслуживания.",
        contentEn: "The General Director of the enterprise Muhabbatov Zafar Hukumovich visited the branch in Khujand and held a meeting with disabled persons receiving services. Issues of improving services were discussed at the meeting.",
        excerptTj: "Директор бо маъюбони филиали Хуҷанд вохӯрӣ гузаронид.",
        excerptRu: "Директор провёл встречу с инвалидами филиала Худжанд.",
        excerptEn: "The Director held a meeting with disabled persons at the Khujand branch.",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        isActive: true,
        publishedAt: new Date("2024-11-05")
      },
      {
        titleTj: "Кушодани филиали нав дар вилояти Хатлон",
        titleRu: "Открытие нового филиала в Хатлонской области",
        titleEn: "Opening of a New Branch in Khatlon Region",
        contentTj: "Бо дастгирии Ҳукумати Ҷумҳурии Тоҷикистон филиали навро дар шаҳри Қӯрғонтеппа кушодем. Ин филиал ба сокинони вилояти Хатлон хизматрасонӣ хоҳад кард.",
        contentRu: "При поддержке Правительства Республики Таджикистан открыли новый филиал в городе Курган-Тюбе. Этот филиал будет обслуживать жителей Хатлонской области.",
        contentEn: "With the support of the Government of the Republic of Tajikistan, we opened a new branch in Kurgan-Tyube city. This branch will serve residents of Khatlon region.",
        excerptTj: "Филиали нав дар шаҳри Қӯрғонтеппа кушода шуд.",
        excerptRu: "Открыт новый филиал в городе Курган-Тюбе.",
        excerptEn: "A new branch opened in Kurgan-Tyube city.",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        isActive: true,
        publishedAt: new Date("2024-10-25")
      }
    ]);
    console.log("Created 4 news items");
  } else {
    console.log("News already exist");
  }

  console.log("Seeding complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding:", error);
    process.exit(1);
  });
