import {useState} from "react";
const DeleteEvent = ({events, setEvents}) => {
  const [eventId, setEventId] = useState("");

  const deleteEvent = (e) => {
    e.preventDefault();
    if (!eventId) {
      alert("Please enter a valid event ID.");
    }
    const newEvents = events.filter((i) => i.id !== eventId);
    setEvents(newEvents);
    localStorage.setItem("events", newEvents);
    setEventId("");
  };
  return (
    <div>
      <h3>Delete Event</h3>
      <form id="delete-event" action="#" onSubmit={deleteEvent}>
        <fieldset>
          <label>Event ID</label>
          <input
            type="number"
            id="delete-event-id"
            min="1"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  );
};

export default DeleteEvent;
