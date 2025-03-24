import SearchForm from "./search-form";
import Image from "next/image";

export default function Home() {
    return (
        <main id="home" className="relative h-screen w-full overflow-hidden md:max-h-screen md:min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 hidden md:block">
                <Image
                    src="https://elpulqui.com/resources/images/clients/index/home.webp"
                    alt="Mar del Plata"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <div className="absolute inset-0 z-0 md:hidden">
                <Image
                    src="/images/main/home-respo.webp"
                    alt="Mar del Plata"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col px-4 md:px-6">
                {/* Buy Ticket CTA */}
                <div className="hidden md:block absolute top-4 md:top-20 right-4 md:right-6 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-lg shadow-lg max-w-[220px] md:max-w-[280px] transition-all duration-300 hover:shadow-xl hover:bg-white border-l-4 border-orange-500 transform hover:-translate-y-1">
                    <div className="text-right">
                        <div className="text-lg md:text-2xl font-bold text-blue-900 mb-1">
                            Compra tu <span className="text-orange-500 relative">
                                BOLETO
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500"></span>
                            </span>
                        </div>
                        <div className="text-sm md:text-base font-medium text-blue-800 flex items-center justify-end gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            100% <span className="text-orange-500 font-bold">ONLINE</span>
                        </div>
                        <div className="mt-3 flex justify-end">
                            <button className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-1">
                                <span>Reservar ahora</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Form */}
                <div className="mt-auto w-full pb-4 md:pb-6">
                    <SearchForm />
                </div>
            </div>
        </main>
    )
}