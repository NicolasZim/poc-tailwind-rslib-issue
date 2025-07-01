import cn from "classnames";

export const ButtonTeal75 = () => {
  return (
    <button
      type="button"
      className={cn(
        "text-black",
        // "bg-al-teal-75",
      )}
    >
      Button Teal 75 (This class is not being cast)
    </button>
  );
};
