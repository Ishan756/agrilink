import { Header } from "@/components/layout/header";

export default function AboutPage() {
  return (<>    
    <Header />
    <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4 text-center">
          About <span className="text-primary">AgriLink</span>
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Empowering the agricultural community with technology and connection.
        </p>
        <div className="border-t border-green-100 my-6" />
        <ul className="space-y-3 text-gray-600 text-base">
          <li>
            🌱 <b>Marketplace:</b> Buy and sell fresh produce, seeds, and equipment directly.
          </li>
          <li>
            🤝 <b>Community:</b> Connect with farmers, buyers, and agri-enthusiasts.
          </li>
          <li>
            📚 <b>Resources:</b> Access guides, tips, and the latest in agri-tech.
          </li>
        </ul>
        <div className="mt-8 text-center">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            Thank you for growing with us!
          </span>
        </div>
      </div>
    </section>
    </>
  );
}