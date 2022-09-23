import {useEffect} from "react";
import {useState, useReducer} from "react";
import isFuture from "date-fns/isFuture";
import {format} from "date-fns";

const initialState = {
  id: "",
  name: "",
  date: "",
  userPosted: "",
};

function init() {
  return {id: "", name: "", date: "", userPosted: ""};
}

const reducer = (state, action) => {
  switch (action.type) {
    case "editName":
      return {...state, name: action.payload};
    case "editDate":
      return {...state, date: action.payload};
    case "editUserPosted":
      return {...state, userPosted: action.payload};
    case "reset":
      return init(action.payload);
    default:
      return state;
  }
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState, init);

  // Add new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFuture(new Date(state.date))) {
      alert("Event date must be in the future");
      dispatch({type: "reset", payload: initialState});
      return "";
    } else {
      const newEvent = {
        name: state.name,
        date: state.date,
        userPosted: state.userPosted,
      };
      const rawResponse = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const content = await rawResponse.json();

      setEvents((events) => [
        ...events,
        {
          id: content.event_id,
          name: content.name,
          date: format(new Date(content.event_date), "MM/dd/yyyy"),
          userPosted: content.user_posted,
        },
      ]);
      dispatch({type: "reset", payload: initialState});
    }
  };

  // Delete a user
  const deleteEvent = async (id) => {
    const rawResponse = await fetch(`http://localhost:8080/events/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });
    const content = await rawResponse.json();
    console.log("content: ", content);
    setEvents((events) => [
      ...content.map((event) => {
        return {
          id: event.event_id,
          name: event.name,
          date: format(new Date(event.event_date), "MM/dd/yyyy"),
          userPosted: event.user_posted,
        };
      }),
    ]);
  };

  // Fetch events
  const getEvents = () => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((res) => {
        setEvents((e) => [
          ...e,
          ...res.map((event) => {
            return {
              id: event.event_id,
              name: event.name,
              date: format(new Date(event.event_date), "MM/dd/yyyy"),
              userPosted: event.user_posted,
            };
          }),
        ]);
      });
  };
  // Fetch events from first render
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div className="forms">
        <h3>Add Event</h3>
        <form id="add-event" action="#">
          <fieldset>
            <p>
              <label>Name</label>
              <input
                type="text"
                id="add-event-name"
                placeholder="Virtual corgi meetup"
                value={state.name}
                onChange={(e) =>
                  dispatch({type: "editName", payload: e.target.value})
                }
                required
              />
            </p>
            <p>
              <label>Date</label>
              <input
                type="date"
                id="add-event-date"
                value={state.date}
                onChange={(e) =>
                  dispatch({type: "editDate", payload: e.target.value})
                }
                required
              />
            </p>
            <p>
              <label>User ID</label>
              <input
                type="text"
                id="add-user-posted"
                value={state.userPosted}
                onChange={(e) =>
                  dispatch({type: "editUserPosted", payload: e.target.value})
                }
                required
              />
            </p>
          </fieldset>
          <input type="submit" onClick={handleSubmit} />
        </form>
      </div>
      <div className="lists">
        <h3>All Events</h3>
        <ul id="events-list">
          {events.map((event, ind) => {
            return (
              <li key={ind} className="cards">
                <strong>Id:</strong> {event.id}
                <br />
                <strong>Name:</strong> {event.name}
                <br />
                <strong>Date:</strong> {event.date}
                <br />
                <strong>User Posted:</strong> {event.userPosted}
                <br />
                <div className="buttons">
                  <button>
                    <span
                      className="material-symbols-outlined delete-btn"
                      onClick={() => deleteEvent(event.id)}>
                      delete
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Events;
