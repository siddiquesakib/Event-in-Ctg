"use client";

export default function PopularFormats() {
  const categories = [
    { name: "Workshop", img: "https://jmreidgroup.com/wp-content/uploads/2019/12/bigstock-Office-Workers-Sitting-At-Roun-288911857.jpg" },
    { name: "Fastival", img: "https://media.timeout.com/images/106204051/1372/1029/image.webp" },
    { name: "Exhibition", img: "https://www.museumnext.com/wp-content/uploads/2023/12/Designing-an-Exhibition.jpg" },
    { name: "Meetup", img: "https://memberpress.com/wp-content/uploads/2019/10/Member-Meetup@2x.png" },
    { name: "Hackathon", img: "https://images.squarespace-cdn.com/content/v1/5e6542d2ae16460bb741a9eb/1603318636443-A846ACUKNYUBA0RPLJ94/marvin-meyer-SYTO3xs06fU-unsplash.jpg?format=1500w" },
    { name: "Conference", img: "https://www.eventdrive.com/hs-fs/hubfs/Imported_Blog_Media/7-tips-pour-organiser-une-conference-qui-cartonne-1.jpg?width=1440&name=7-tips-pour-organiser-une-conference-qui-cartonne-1.jpg" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Popular Formats in Chattogram</h2>
        <p className="text-gray-400 mt-2">
          Explore events by categories in a fun, visual way!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg overflow-hidden relative transform hover:scale-110 transition"
              style={{
                backgroundImage: `url(${cat.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-30 rounded-full transition"></div>
            </div>
            <span className="mt-3 text-white font-semibold group-hover:text-blue-400 text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
