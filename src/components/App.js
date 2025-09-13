import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [filter, setFilter] = useState("all");

  const now = new Date();

  // Filtering events
  const filteredEvents =
    filter === "all"
      ? events
      : filter === "past"
      ? events.filter((e) => new Date(e.end) < now)
      : events.filter((e) => new Date(e.start) >= now);

  // Popup handlers
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setEventTitle("");
    setEventLocation("");
    setShowCreatePopup(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventLocation(event.location);
    setShowEditPopup(true);
  };

  const handleCreateEvent = () => {
    if (eventTitle.trim()) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title: eventTitle,
          location: eventLocation,
          start: selectedSlot.start,
          end: selectedSlot.end,
        },
      ]);
      setShowCreatePopup(false);
    }
  };

  const handleUpdateEvent = () => {
    setEvents(
      events.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, title: eventTitle, location: eventLocation }
          : event
      )
    );
    setShowEditPopup(false);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setShowEditPopup(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Event Tracker Calendar</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons" style={{ marginBottom: 20 }}>
        {["all", "past", "upcoming"].map((type) => (
          <button
            key={type}
            className={`btn ${filter === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
            style={{
              marginRight: 8,
              padding: "6px 12px",
              cursor: "pointer",
              backgroundColor: filter === type ? "#4caf50" : "#eee",
              color: filter === type ? "white" : "black",
              border: "none",
              borderRadius: 4,
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <BigCalendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        popup
        views={["month"]}
        eventPropGetter={(event) => {
          const isPast = new Date(event.end) < now;
          return {
            style: {
              backgroundColor: isPast
                ? "rgb(222, 105, 135)"
                : "rgb(140, 189, 76)",
              color: "white",
            },
          };
        }}
      />

      {/* Create Event Popup */}
      {showCreatePopup && (
        <div className="popup-overlay">
          <div className="mm-popup__box">
            <div className="mm-popup__box__header">
              <h3>Create Event</h3>
            </div>
            <div className="mm-popup__box__body">
              <input
                type="text"
                placeholder="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="event-input"
              />
              <input
                type="text"
                placeholder="Event Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="event-input"
              />
            </div>
            <div className="mm-popup__box__footer">
              <div className="mm-popup__box__footer__right-space">
                <button
                  className="mm-popup__btn save-btn"
                  onClick={handleCreateEvent}
                >
                  Save
                </button>
                <button
                  className="mm-popup__btn cancel-btn"
                  onClick={() => setShowCreatePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Popup */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="mm-popup__box">
            <div className="mm-popup__box__header">
              <h3>Edit Event</h3>
            </div>
            <div className="mm-popup__box__body">
              <input
                type="text"
                placeholder="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="event-input"
              />
              <input
                type="text"
                placeholder="Event Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="event-input"
              />
            </div>
            <div className="mm-popup__box__footer">
              <div className="mm-popup__box__footer__right-space">
                <button
                  className="mm-popup__btn mm-popup__btn--info"
                  onClick={handleUpdateEvent}
                >
                  Save
                </button>
                <button
                  className="mm-popup__btn mm-popup__btn--danger"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
                <button
                  className="mm-popup__btn"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
