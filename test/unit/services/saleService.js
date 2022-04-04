const { expect } = require('chai');
const sinon = require('sinon');

const SaleService = require('../../../services/saleService');
const SaleModel = require('../../../models/saleModel');

describe('Verifica se ao chamar "getAll" de "SaleService" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getAll', () => {
        expect(typeof SaleService.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {

        describe('Caso não tenha produtos cadastrados no banco de dados', () => {

            before(() => {
                sinon.stub(SaleModel, 'getAll').resolves([]);
            });

            after(() => {
                SaleModel.getAll.restore();
            });

            it('O retorno é um array', async () => {
                const sales = await SaleService.getAll();
                expect(sales).to.be.an('array');
            });

            it('O retorno é um array vazio', async () => {
                const sales = await SaleService.getAll();
                expect(sales).to.be.an('array').that.is.empty;
            });

        });
    });
});

describe('Verifica se ao chamar "getById" de "SaleService" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getById', () => {
        expect(typeof SaleService.getById).to.be.equal('function');
    });
    
    describe('Caso não encontre a venda cadastrada com o id informado', () => {

        before(() => {
            sinon.stub(SaleModel, 'getById').resolves(false);
        });

        after(() => {
            SaleModel.getById.restore();
        });

        it('Retorna false caso não encontre a venda buscada pelo id informado', async () => {
            const result = await SaleService.getById();
            expect(result).to.be.false;
        });

    });

    describe('Caso encontre a venda cadastrada com o id informado', () => {

        const expectedSale = [{
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2
        }]

        before(() => {
            sinon.stub(SaleModel, 'getById').resolves(expectedSale);
        });

        after(() => {
            SaleModel.getById.restore();
        });

        it('Verifica se o valor retornado é um objeto', async () => {
            const [founded] = await SaleService.getById(1);
            expect(founded).to.be.an('object');
        });

        it('Verifica se o objeto não está vazio', async () => {
            const [founded] = await SaleService.getById(1);
            expect(founded).to.be.not.empty;
        });

        it('Verifica se o valor retornado é um objeto com as keys date, productId, quantity', async () => {
            const [founded] = await SaleService.getById(1);
            expect(founded).to.be.have.all.keys('date', 'productId', 'quantity');
        });
        
    });
});

describe('Verifica se ao chamar "allSerialize" ela possuí o comportamento esperado:', () => {

    it('Existe uma função allSerialize', () => {

        expect(typeof SaleService.allSerialize).to.be.equal('function');
    });

    const sale = {
        id: 1,
        date:   '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 10
    }

    before(() => {
        sinon.stub(SaleService, 'allSerialize').returns({
            saleId: sale.id,
            date: sale.date,
            productId: sale.product_id,
            quantity: sale.quantity,
        });
    });

    after(() => {
        SaleService.allSerialize.restore();
    });

    it('Existe uma função allSerialize', () => {

        expect(typeof SaleService.allSerialize).to.be.equal('function');
    });

    it('A função é chamada passando um objeto', () => {
        SaleService.allSerialize(sale);
        expect(SaleService.allSerialize.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('A função retorna um objeto modificado', () => {
        const serialized = SaleService.allSerialize(sale);
        expect(serialized).to.deep.equal(
        {
            saleId: 1,
            date:   '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 10
        });
    });
});

describe('Verifica se ao chamar "serialize" ela possuí o comportamento esperado:', () => {

    it('Existe uma função serialize', () => {

        expect(typeof SaleService.serialize).to.be.equal('function');
    });

    const sale = {
        id: 1,
        date:   '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 10
    }

    before(() => {
        sinon.stub(SaleService, 'serialize').returns({
            date: sale.date,
            productId: sale.product_id,
            quantity: sale.quantity,
        });
    });

    after(() => {
        SaleService.serialize.restore();
    });

    it('Existe uma função serialize', () => {

        expect(typeof SaleService.serialize).to.be.equal('function');
    });

    it('A função é chamada passando um objeto', () => {
        SaleService.serialize(sale);
        expect(SaleService.serialize.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('A função retorna um objeto modificado', () => {
        const serialized = SaleService.serialize(sale);
        expect(serialized).to.deep.equal(
        {
            date:   '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 10
        });
    });
});
