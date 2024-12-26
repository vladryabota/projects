export const Stats = ({ items }) => {
  if (!items.length > 0)
    return (
      <p className="footer">
        <em>Start adding some items to your packing list 👌</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage == 100
          ? "You have everything ready to go"
          : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};
export default Stats;
