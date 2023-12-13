export const Header = () => {
  return (
    <header className="bg-zinc-700 text-white">
      <div className="p-4 md:p-10 lg:p-20 xl:p-10">
        {/* Para telas pequenas */}
        <h1 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl">
          Breweries
        </h1>
        <h2 className="font-bold text-xs md:text-sm lg:text-base xl:text-lg">
          A Breweries list by Open Breweries DB
        </h2>
      </div>
    </header>
  );
};
