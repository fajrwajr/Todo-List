import React, { useEffect, useState } from "react";
//include images into your bundle

//create your first component
const List = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputList, setInputList] = useState(["Niessa", "Sandy", "Liela"]);

	const delItem = index => {
		setInputList(inputList.filter((result, i) => index != i));
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/santaMaria")
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => setInputList(data));
	}, []); //empty array means it will only run once

	function addItem(e) {
		if (e.keyCode == 13) {
			setInputValue(inputValue);
			const list = inputList.concat(inputValue);
			setInputList(list);
		}
	}

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
