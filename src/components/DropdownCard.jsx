export default function DropdownCard({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="container">
      <h1>Restaurant Menu</h1>

      {menuData.map((menu, index) => (
        <MenuSection
          key={index}
          menu={menu}
          isOpen={selectedCategory === menu.category}
          onToggle={() =>
            setSelectedCategory(
              selectedCategory === menu.category
                ? ""
                : menu.category
            )
          }
        />
      ))}
    </div>
  );
}