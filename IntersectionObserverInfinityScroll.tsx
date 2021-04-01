import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from "axios";
import faker from "faker";
import styled from "@emotion/styled";

const Container = styled.div`
	margin-top: 85px;
	overflow-y: auto;
	height: calc(100vh - 185px);
	li {
		margin: 0.5rem 0;
	}
	p {
		margin-top: 0.25rem;
	}
`;

const Username = styled.span`
	font-weight: 800;
	margin-right: 5px;
	font-size: 1.2rem;
`;

const DateSpan = styled.span`
	color: darkgrey;
`;

const ListTest2 = () => {
	const messageListRef = React.createRef<HTMLDivElement>();
	const bottomRef = React.createRef<HTMLDivElement>();
	const [messages, setMessages] = React.useState(
		[...new Array(10)].map(elem => ({
			id: faker.random.uuid(),
			message: faker.lorem.sentences(),
			user: faker.internet.userName(),
			date: faker.date.past(),
		}))
	);
	const [isLoading, setLoading] = React.useState<boolean>(false);

	const scrollCallback = (entries: IntersectionObserverEntry[]) => {
		if (entries[0].isIntersecting) {
			const fake = [...new Array(20)].map(elem => ({
				id: faker.random.uuid(),
				message: faker.lorem.sentences(),
				user: faker.internet.userName(),
				date: faker.date.past(),
			}));
			setLoading(true);
			setTimeout(() => {
				setMessages(msgs => [...msgs, ...fake]);
				setLoading(false);
			}, 500);
		}
	};

	React.useEffect(() => {
		const scroll = new IntersectionObserver(scrollCallback, {
			root: messageListRef.current!,
			rootMargin: "50px",
		});
		scroll.observe(bottomRef.current!);
		return () => {
			scroll.disconnect();
		};
	}, [messageListRef, bottomRef]);
	return (
		<Container ref={messageListRef}>
			<ul>
				{messages.map(message => (
					<li key={message.id}>
						<Username>{message.user}</Username>
						<DateSpan>
							{new Intl.DateTimeFormat("en-GB").format(new Date(message.date))}
						</DateSpan>
						<p>{message.message}</p>
					</li>
				))}
				<div ref={bottomRef} />
				{isLoading && <div>로딩중</div>}
			</ul>
		</Container>
	);
};

export default ListTest2;
