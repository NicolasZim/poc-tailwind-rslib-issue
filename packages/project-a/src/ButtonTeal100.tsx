import cn from "classnames";

export const ButtonTeal100 = () => {
  return (
    <button
      type="button"
      className={cn(
        "text-black",
        // "bg-al-teal-100",
      )}
    >
      Button Teal 100 (This class is not being cast)
    </button>
  );
};
