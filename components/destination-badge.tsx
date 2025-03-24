export default function DestinationBadge() {
  return (
    <div className="absolute left-10 top-1/2 transform -translate-y-1/2 max-w-md">
      <div className="flex flex-col">
        <div className="bg-blue-900 text-white py-4 px-8 text-5xl font-cursive rounded-t-lg">Mar del Plata</div>
        <div className="bg-orange-500 text-white py-6 px-8 rounded-br-lg">
          <div className="text-5xl font-cursive">Todo el año</div>
          <div className="text-3xl font-cursive text-right">¡Allá vamos!</div>
        </div>
      </div>
    </div>
  )
}

