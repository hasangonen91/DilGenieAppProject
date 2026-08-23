// A1 + A2 seviye verileri
const {fs, w, s, cat, q} = require('./helpers');

const A1 = {
  A1level: [
    {
      vocabulary: {
        en: 'Vocabulary',
        tr: 'Kelime Bilgisi',
        greetings: cat('Greetings', 'Selamlaşmalar', [
          w('Hello', 'Merhaba'), w('Goodbye', 'Hoşça kal'),
          w('Good morning', 'Günaydın'), w('Good evening', 'İyi akşamlar'),
          w('How are you?', 'Nasılsın?'), w('Please', 'Lütfen'),
          w('Thank you', 'Teşekkürler'), w('Sorry', 'Üzgünüm'),
          w('Yes', 'Evet'), w('No', 'Hayır'),
        ], [
          s('Hello, how are you today?', 'Merhaba, bugün nasılsın?'),
          s('Good morning, my friend!', 'Günaydın, dostum!'),
          s('Thank you very much for your help.', 'Yardımın için çok teşekkür ederim.'),
          s('I am sorry, I am late.', 'Üzgünüm, geç kaldım.'),
        ]),
        family: cat('Family', 'Aile', [
          w('Mother', 'Anne'), w('Father', 'Baba'), w('Sister', 'Kız kardeş'),
          w('Brother', 'Erkek kardeş'), w('Grandmother', 'Babaanne'),
          w('Grandfather', 'Dedem'), w('Son', 'Oğul'), w('Daughter', 'Kız evlat'),
          w('Baby', 'Bebek'), w('Uncle', 'Amca'),
        ], [
          s('My mother cooks delicious food.', 'Annem lezzetli yemek yapar.'),
          s('My grandfather is seventy years old.', 'Dedem yetmiş yaşında.'),
          s('I have one brother and two sisters.', 'Bir erkek kardeşim ve iki kız kardeşim var.'),
          s('The baby is sleeping now.', 'Bebek şimdi uyuyor.'),
        ]),
        months: cat('Months', 'Aylar', [
          w('January', 'Ocak'), w('February', 'Şubat'), w('March', 'Mart'),
          w('April', 'Nisan'), w('May', 'Mayıs'), w('June', 'Haziran'),
          w('July', 'Temmuz'), w('August', 'Ağustos'), w('November', 'Kasım'),
          w('December', 'Aralık'),
        ], [
          s('My birthday is in June.', 'Doğum günüm haziranda.'),
          s('December is very cold here.', 'Aralık burada çok soğuk.'),
          s('School starts in September.', 'Okul eylülde başlar.'),
          s('We go on holiday in July.', 'Temmuzda tatile gidiyoruz.'),
        ]),
        colors_numbers_shapes: cat('Colors & Numbers', 'Renkler ve Sayılar', [
          w('Red', 'Kırmızı'), w('Blue', 'Mavi'), w('Green', 'Yeşil'),
          w('Yellow', 'Sarı'), w('Black', 'Siyah'), w('White', 'Beyaz'),
          w('One', 'Bir'), w('Two', 'İki'), w('Three', 'Üç'), w('Ten', 'On'),
        ], [
          s('The sky is blue.', 'Gökyüzü mavidir.'),
          s('I have three apples.', 'Elde üç elmam var.'),
          s('Her dress is red and white.', 'Onun elbisesi kırmızı beyaz.'),
          s('Two plus three is five.', 'İki artı üç beştir.'),
        ]),
        days: cat('Days', 'Günler', [
          w('Monday', 'Pazartesi'), w('Tuesday', 'Salı'), w('Wednesday', 'Çarşamba'),
          w('Thursday', 'Perşembe'), w('Friday', 'Cuma'), w('Saturday', 'Cumartesi'),
          w('Sunday', 'Pazar'), w('Today', 'Bugün'), w('Tomorrow', 'Yarın'),
          w('Yesterday', 'Dün'),
        ], [
          s('Monday is the first day of work.', 'Pazartesi işin ilk günüdür.'),
          s('We rest on Sunday.', 'Pazar günü dinleniyoruz.'),
          s('See you tomorrow!', 'Yarın görüşürüz!'),
          s('Yesterday was Saturday.', 'Dün cumartesiydi.'),
        ]),
        food_drinks: cat('Food & Drinks', 'Yiyecek ve İçecekler', [
          w('Bread', 'Ekmek'), w('Water', 'Su'), w('Milk', 'Süt'),
          w('Cheese', 'Peynir'), w('Apple', 'Elma'), w('Egg', 'Yumurta'),
          w('Tea', 'Çay'), w('Coffee', 'Kahve'), w('Soup', 'Çorba'), w('Rice', 'Pilav'),
        ], [
          s('I drink tea every morning.', 'Her sabah çay içerim.'),
          s('Turkish breakfast is wonderful.', 'Türk kahvaltısı harikadır.'),
          s('An apple a day keeps the doctor away.', 'Günde bir elma doktoru uzak tutar.'),
          s('Would you like some coffee?', 'Kahve ister misin?'),
        ]),
        animals: cat('Animals', 'Hayvanlar', [
          w('Dog', 'Köpek'), w('Cat', 'Kedi'), w('Bird', 'Kuş'),
          w('Fish', 'Balık'), w('Horse', 'At'), w('Cow', 'İnek'),
          w('Sheep', 'Koyun'), w('Chicken', 'Tavuk'), w('Lion', 'Aslan'), w('Bear', 'Ayı'),
        ], [
          s('The dog is in the garden.', 'Köpek bahçede.'),
          s('A lion lives in the forest.', 'Aslan ormanda yaşar.'),
          s('She has a white cat.', 'Onun beyaz bir kedisi var.'),
          s('Birds fly to warm countries.', 'Kuşlar sıcak ülkelere uçar.'),
        ]),
        school_items: cat('School Items', 'Okul Eşyaları', [
          w('Book', 'Kitap'), w('Pen', 'Kalem'), w('Bag', 'Çanta'),
          w('Teacher', 'Öğretmen'), w('Student', 'Öğrenci'), w('Desk', 'Sıra'),
          w('Board', 'Tahta'), w('Notebook', 'Defter'), w('Ruler', 'Cetvel'), w('Lesson', 'Ders'),
        ], [
          s('Open your books, please.', 'Kitaplarınızı açın lütfen.'),
          s('The teacher writes on the board.', 'Öğretmen tahtaya yazar.'),
          s('I put my pen in my bag.', 'Kalemimi çantama koydum.'),
          s('English is my favorite lesson.', 'İngilizce en sevdiğim ders.'),
        ]),
      },
    },
  ],
};

const A2 = {
  A2level: [
    {
      vocabulary: {
        en: 'Vocabulary',
        tr: 'Kelime Bilgisi',
        daily_routines: cat('Daily Routines', 'Günlük Rutinler', [
          w('Wake up', 'Uyanmak'), w('Get dressed', 'Giyinmek'),
          w('Brush teeth', 'Diş fırçalamak'), w('Have lunch', 'Öğle yemeği yemek'),
          w('Take a shower', 'Duş almak'), w('Go to bed', 'Yatmaya gitmek'),
          w('Do homework', 'Ödev yapmak'), w('Clean the house', 'Ev temizlemek'),
          w('Watch TV', 'Televizyon izlemek'), w('Relax', 'Dinlenmek'),
        ], [
          s('I wake up at seven every morning.', 'Her sabah yedi. de uyanırım.'),
          s('She takes a shower before bed.', 'Yatmadan önce duş alıyor.'),
          s('After dinner, I watch TV with family.', 'Akşam yemeğinden sonra aileyle TV izlerim.'),
          s('Children do homework after school.', 'Çocuklar okuldan sonra ödev yapar.'),
        ]),
        shopping: cat('Shopping', 'Alışveriş', [
          w('Price', 'Fiyat'), w('Cheap', 'Ucuz'), w('Expensive', 'Pahalı'),
          w('Shop', 'Mağaza'), w('Customer', 'Müşteri'),
          w('Discount', 'İndirim'), w('Pay', 'Ödemek'), w('Receipt', 'Fiş'),
          w('Size', 'Beden, boyut'), w('Try on', 'Denemek (giysi)'),
        ], [
          s('This jacket is too expensive.', 'Bu ceket çok pahalı.'),
          s('Can I try on these shoes?', 'Bu ayakkabıları deneyebilir miyim?'),
          s('There is a discount on summer clothes.', 'Yaz kıyafetlerinde indirim var.'),
          s('Keep the receipt, please.', 'Fişi saklayın lütfen.'),
        ]),
        weather_seasons: cat('Weather & Seasons', 'Hava ve Mevsimler', [
          w('Sunny', 'Güneşli'), w('Rainy', 'Yağmurlu'),
          w('Snowy', 'Karlı'), w('Windy', 'Rüzgarlı'),
          w('Spring', 'İlkbahar'), w('Summer', 'Yaz'),
          w('Autumn', 'Sonbahar'), w('Winter', 'Kış'),
          w('Cloudy', 'Bulutlu'), w('Hot', 'Sıcak'),
        ], [
          s('It is sunny and hot in summer.', 'Yazın hava güneşli ve sıcaktır.'),
          s('Winter is cold and snowy here.', 'Kış burada soğuk ve karlıdır.'),
          s('Autumn leaves are beautiful.', 'Sonbahar yaprakları güzeldir.'),
          s('What is the weather like today?', 'Bugün hava nasıl?'),
        ]),
        hobbies: cat('Hobbies', 'Hobiler', [
          w('Painting', 'Resim yapmak'), w('Reading', 'Okumak'),
          w('Cooking', 'Yemek yapmak'), w('Fishing', 'Balık tutmak'),
          w('Photography', 'Fotoğraf çekmek'), w('Gardening', 'Bahçıvanlık'),
          w('Playing chess', 'Satranç oynamak'), w('Cycling', 'Bisiklet sürmek'),
          w('Singing', 'Şarkı söylemek'), w('Camping', 'Kamp yapmak'),
        ], [
          s('My hobby is painting animals.', 'Benim hobim hayvan resmetmek.'),
          s('They go camping in summer.', 'Yazın kamp yapmaya giderler.'),
          s('Reading books makes me happy.', 'Kitap okumak beni mutlu ediyor.'),
          s('He enjoys fishing at the lake.', 'Göle balık tutmayı seviyor.'),
        ]),
        transportation: cat('Transportation', 'Ulaşım', [
          w('Bus stop', 'Otobüs durağı'), w('Ticket office', 'Bilet gişesi'),
          w('Traffic', 'Trafik'), w('Subway', 'Metro'),
          w('Airplane', 'Uçak'), w('Ship', 'Gemi'),
          w('Motorcycle', 'Motosiklet'), w('Bicycle', 'Bisiklet'),
          w('Driver', 'Şoför'), w('Passenger', 'Yolcu'),
        ], [
          s('I go to work by subway.', 'Metroyla işe giderim.'),
          s('The traffic is terrible this morning.', 'Bu sabah trafik berbat.'),
          s('How much is a bus ticket?', 'Otobüs bileti ne kadar?'),
          s('Many people travel by bicycle.', 'Birçok kişi bisikletle seyahat eder.'),
        ]),
        house_rooms: cat('House & Rooms', 'Ev ve Odalar', [
          w('Kitchen', 'Mutfak'), w('Living room', 'Oturma odası'),
          w('Bedroom', 'Yatak odası'), w('Bathroom', 'Banyo'),
          w('Balcony', 'Balkon'), w('Window', 'Pencere'),
          w('Door', 'Kapı'), w('Stairs', 'Merdiven'),
          w('Garden', 'Bahçe'), w('Roof', 'Çatı'),
        ], [
          s('We cook meals in the kitchen.', 'Yemekleri mutfakta pişiririz.'),
          s('The living room has a big window.', 'Oturma odasının büyük penceresi var.'),
          s('Our house has a small balcony.', 'Bizim evin küçük bir balkonu var.'),
          s('The cat sleeps under the stairs.', 'Kedi merdivenin altında uyuyor.'),
        ]),
        jobs: cat('Jobs', 'Meslekler', [
          w('Doctor', 'Doktor'), w('Engineer', 'Mühendis'),
          w('Lawyer', 'Avukat'), w('Farmer', 'Çiftçi'),
          w('Chef', 'Aşçı'), w('Pilot', 'Pilot'),
          w('Police officer', 'Polis memuru'), w('Waiter', 'Garson'),
          w('Hairdresser', 'Kuaför'), w('Journalist', 'Gazeteci'),
        ], [
          s('The doctor works at the hospital.', 'Doktor hastanede çalışıyor.'),
          s('A chef cooks food in a restaurant.', '.Aşçı lokantada yemek yapar.'),
          s('She is an engineer at a car factory.', 'O, araba fabrikasında mühendis.'),
          s('The police officer helps people.', 'Polis memuru insanlara yardım eder.'),
        ]),
        holidays: cat('Holidays', 'Tatiller ve Kutlamalar', [
          w('New Year', 'Yılbaşı'), w('Gift', 'Hediye'),
          w('Party', 'Parti'), w('Fireworks', 'Havai fişek'),
          w('Celebration', 'Kutlama'), w('Invitation', 'Davetiye'),
          w('Wedding', 'Düğün'), w('Parade', 'Gezi, gösteri'),
          w('Cake', 'Pasta'), w('Guest', 'Misafir'),
        ], [
          s('Happy New Year to everyone!', 'Herkese mutlu yıllar!'),
          s('We invite guests to our party.', 'Partimize misafir davet ediyoruz.'),
          s('The wedding was beautiful.', '.Düğün çok güzeldi.'),
          s('Children love birthday cake.', 'Çocuklar doğum günü pastasını sever.'),
        ]),
      },
    },
  ],
};
module.exports = {A1, A2};
