import { NewTaskPopUp } from "./new-work-popup.js";
import * as Tasks from "./works.js";
import { WorkForm } from "./work-form.js";

class App {
	static init() {
		NewTaskPopUp.addPopUpHandler();

		WorkForm.addListener();

		Tasks.TasksList.importFromStorage();

		this.addSortListeners();
	}

	static addSortListeners() {
		const sortBtn = document.querySelector(".fa-sort");
		const sortContainer = document.querySelector(".sort-container");
		const sortOrderBtn = document.querySelector(".fa-arrow-down");

		sortBtn.addEventListener("click", () => {
			sortContainer.classList.toggle("visible");
		});

		document.body.addEventListener("click", event => {
			if (
				event.target !== sortContainer &&
				event.target.type !== "radio" &&
				event.target.closest("div") !== sortContainer &&
				event.target !== sortBtn
			)
				sortContainer.classList.remove("visible");
		});

		sortContainer.addEventListener("click", event => {
			if (event.target.type === "radio") {
				Tasks.TasksList.sort(event.target.value);
			}
		});

		sortOrderBtn.addEventListener("click", event => {
			event.target.classList.toggle("fa-arrow-down");
			event.target.classList.toggle("fa-arrow-up");

			Tasks.TasksList.sortOrder =
				Tasks.TasksList.sortOrder === "DOWN"
					? (Tasks.TasksList.sortOrder = "UP")
					: (Tasks.TasksList.sortOrder = "DOWN");

			Tasks.TasksList.list.reverse();
			Tasks.TasksList.loadList();
		});
	}
}

App.init();
