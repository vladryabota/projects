import "./App.css";
import { useState } from "react";

function App() {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

  const [friends, setFriendsList] = useState(initialFriends);
  const [formAddOpen, setFormAddOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((curr) =>
      curr && curr.id === friend.id ? null : friend
    );
  };

  const handlSubmitNewFriend = (friend) => {
    setFriendsList((friends) => [...friends, friend]);
  };

  const handleShowFriend = () => {
    setFormAddOpen((show) => !show);
  };

  const handleSplitTheBill = (value) => {
    setFriendsList((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          handleSelectedFriend={handleSelectedFriend}
        ></FriendList>
        {formAddOpen && (
          <FormAddFriend
            addNewFriend={handlSubmitNewFriend}
            setFormAddOpen={setFormAddOpen}
          ></FormAddFriend>
        )}
        <Button onClick={handleShowFriend}>
          {formAddOpen ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill
        selectedFriend={selectedFriend}
        handleSplitTheBill={handleSplitTheBill}
      ></FormSplitBill>
    </div>
  );
}

const FormAddFriend = ({ addNewFriend, setFormAddOpen }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    addNewFriend(newFriend);

    setFormAddOpen(false);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤦‍♂️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🤦‍♂️ Friend's image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
};

const FriendList = ({ friends, handleSelectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            key={friend.id}
            friend={friend}
            handleSelectedFriend={handleSelectedFriend}
          ></Friend>
        );
      })}
    </ul>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

const Friend = ({ friend, handleSelectedFriend }) => {
  return (
    <li className="">
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance && friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      ) : null}
      {friend.balance && friend.balance > 0 ? (
        <p className="green">
          {friend.name} ows you {friend.balance}$
        </p>
      ) : null}
      {friend.balance === 0 ? <p>You and {friend.name} are even</p> : null}
      <Button onClick={() => handleSelectedFriend(friend)}>Select</Button>
    </li>
  );
};

const FormSplitBill = ({ selectedFriend, handleSplitTheBill }) => {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [pays, setPays] = useState("");

  const payedByFriend = bill ? bill - yourExpense : "";

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!bill || !yourExpense) return;
    handleSplitTheBill(pays === "user" ? payedByFriend : -yourExpense);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSumbit}>
      <h2>Split a bill with {selectedFriend ? selectedFriend.name : null}</h2>

      <label>💰 Bill value</label>
      <input
        type=" text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => setYourExpense(e.target.value)}
      />

      <label>{selectedFriend ? selectedFriend.name : null}'s expense</label>
      <input type="text" value={payedByFriend} />

      <label>🤑 Who is paying the bill</label>

      <select value={pays} onChange={(e) => setPays(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">friend</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
