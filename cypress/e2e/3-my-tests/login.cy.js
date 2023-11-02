describe("erik local site", () => {
	it("can login", () => {
		//cy.visit("https://chimerical-pika-4da3a1.netlify.app/");
		cy.visit("index.html");
		cy.get("#uname").type("ludviga@noroff.no", { delay: 100 });
		cy.get("#password-input").type("password{enter}", { delay: 100 });
		cy.get("h5").contains("ludviga");
		cy.get("a").contains("Log Out").click();
	});
});

describe("erik local site", () => {
	it("Shows error when wrong credentials", () => {
		cy.visit("index.html");
		cy.get("#uname").type("ludviga@noroff.nos", { delay: 100 });
		cy.get("#password-input").type("password{enter}", { delay: 100 });
		cy.get(".invalid-feedback").contains("Invalid");
	});
});

/* describe("login", () => {
	it("store and access values", () => {
		cy.visit("index.html");
		const myEmail = "eivind.holvik@noroff.no";
		cy.get("input#email").type(myEmail);
		cy.get("input#pw").type(`wefwefwef{enter}`);
		cy.window()
			.its("localStorage")
			.invoke("getItem", "email")
			.should("eq", myEmail);
	});
}); */
