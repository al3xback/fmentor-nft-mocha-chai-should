import { should } from 'chai';
import jsdom from 'jsdom';
import got from 'got';

should();

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-mocha-chai-should/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of card image width and height', () => {
		const cardImageEl = document.querySelector('.card__image img');
		const cardImageWidth = cardImageEl.width;
		const cardImageHeight = cardImageEl.height;

		cardImageWidth.should.be.a('number');
		cardImageHeight.should.be.a('number');
	});

	it("should have a title element that contains 'Equilibrium #3429' word", () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent.trim();

		cardTitle.should.equal('Equilibrium #3429');
	});

	it('should have two children inside of the article element', () => {
		const articleEl = document.querySelector('article');
		const articleChildrenElements = articleEl.children;

		articleChildrenElements.should.have.lengthOf(2);
	});

	it('should have an empty alt attribute value of card image element', () => {
		const cardImageAlt = document.querySelector('.card__image img').alt;

		cardImageAlt.should.be.empty;
	});
});
