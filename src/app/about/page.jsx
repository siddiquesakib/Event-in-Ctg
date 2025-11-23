export default function AboutPage() {
  return (
    <div className="bg-black text-gray-200 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-white mb-6">
          About <span className="text-blue-500">EventCTG</span>
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-10">
          EventCTG is your gateway to discovering the best events happening 
          across Chittagong. From concerts and cultural festivals to 
          tech meetups and exhibitions — we bring every happening event 
          under one platform.
        </p>

        <div className="space-y-8">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To make event discovery simple, accessible, and visually engaging.  
              Whether you are a local resident, a tourist, or an organizer — 
              our platform ensures you never miss out on the moments that matter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Why We Built This</h2>
            <p className="text-gray-400 leading-relaxed">
              Chittagong has a vibrant event scene, but information is scattered.  
              We wanted to build the most elegant and user-friendly platform 
              that highlights the city’s energy, creativity, and culture.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Future Goals</h2>
            <ul className="list-disc ml-6 text-gray-400 space-y-2">
              <li>Integrated ticket booking</li>
              <li>User profiles & event history</li>
              <li>Organizer dashboards</li>
              <li>Real-time event updates</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
