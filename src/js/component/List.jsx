import React, { useEffect, useState } from "react";
//include images into your bundle
//create your first component
const List = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputList, setInputList] = useState(["Niessa", "Sandy", "Liela"]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/13")
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => setInputList(data));
	}, []);

	function addItem(e) {
		if (e.keyCode == 13) {
			setInputValue(inputValue);
			const list = inputList.concat(inputValue);
			setInputList(list);

			fetch("https://assets.breatheco.de/apis/fake/todos/user/13", {
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response => {
				if (response.ok) {
					fetch("https://assets.breatheco.de/apis/fake/todos/user/13")
						.then(response => {
							if (!response.ok) {
								throw new Error(response.statusText);
							}
							return response.json();
						})
						.then(data => setInputList(data))
						.catch(error => console.error(error));
				}
			});
		}
	}

	const delItem = index => {
		let newList = setInputList(inputList.filter((result, i) => index != i));

		fetch("https://assets.breatheco.de/apis/fake/todos/user/13", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => console.log(response))
			.catch(error => console.error(error));
	};

	return (
		<div className="text-center mt-5">
			<h1>ToDo List</h1>
			<h3>{inputList.length}</h3>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyUp={addItem}
			/>
			<div className="text-center mt-5">
				{inputList.map((result, index) => (
					<>
						<li key={index}>
							{result}
							<button onClick={() => delItem(index)}>
								<i
									className="fa fa-times"
									aria-hidden="true"></i>
							</button>
						</li>
					</>
				))}
				<button onClick={() => setInputList([])}>Delete</button>
			</div>
		</div>
	);
};
export default List;
