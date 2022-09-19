import {useState, useReducer} from "react";
const mockEvents = [
  {
    id: 1,
    name: "Usher Concert",
    date: "01/01/2023",
  },
  {
    id: 2,
    name: "Circus",
    date: "12/02/2022",
  },
  {
    id: 3,
    name: "Fright Fest",
    date: "10/31/2022",
  },
];

const initialState = {
  id: "",
  name: "",
  date: null,
  description: "",
  category: "",
};

const reducer = (state, action) => {
  console.log(action, "this is the action");
  switch (action.type) {
    case "editId":
      console.log("Logged if the editName action is being dispatched");
      return {...state, id: action.payload};
    case "editName":
      return {...state, name: action.payload};
    case "editDate":
      return {...state, date: action.payload};
    default:
      return state;
  }
};

const Events = () => {
  const [events, setEvents] = useState(mockEvents);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents((events) => [...events, state]);
  };
  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>
        <ul id="events-list">
          {events.map((event, ind) => {
            return (
              <li key={ind}>
                Id: {event.id}
                <br />
                Name: {event.name}
                <br />
                Date: {event.date}
              </li>
            );
          })}
        </ul>

        <h3>Add Event</h3>
        <form id="add-event" action="#">
          <fieldset>
            <p>
              <label>ID</label>
              <input
                type="number"
                id="add-event-id"
                onChange={(e) =>
                  dispatch({type: "editId", payload: e.target.value})
                }
              />
            </p>
            <p>
              <label>Name</label>
              <input
                type="text"
                id="add-event-name"
                placeholder="Virtual corgi meetup"
                onChange={(e) =>
                  dispatch({type: "editName", payload: e.target.value})
                }
              />
            </p>
            <p>
              <label>Date</label>
              <input
                type="date"
                id="add-event-date"
                onChange={(e) =>
                  dispatch({type: "editDate", payload: e.target.value})
                }
              />
            </p>
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" onClick={handleSubmit} />
        </form>
      </div>
    </section>
  );
};

export default Events;
