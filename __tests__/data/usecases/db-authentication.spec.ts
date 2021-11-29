import { DbAuthentication } from '@data/usecases';
import { mockAuthenticationParams, throwError } from '@test/domain/mocks';
import faker from 'faker';
import { SuperTest } from 'supertest';
import {
  AddAccountRepositorySpy,
  EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy,
} from '../mocks';

type SutTypes = {
    sut: DbAuthentication,
    loadAccountByEmailSpy: LoadAccountByEmailRepositorySpy,
    hashComparerSpy: HashComparerSpy,
    encrypterSpy: EncrypterSpy,
    updateAccessTokenSpy: UpdateAccessTokenRepositorySpy,
    addAccountSpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new LoadAccountByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const updateAccessTokenSpy = new UpdateAccessTokenRepositorySpy();
  const addAccountSpy = new AddAccountRepositorySpy();

  const sut = new DbAuthentication(loadAccountByEmailSpy, hashComparerSpy, encrypterSpy, updateAccessTokenSpy);
  return {
    loadAccountByEmailSpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenSpy,
    sut,
    addAccountSpy,
  };
};

describe('DbAuthentication Usecase', () => {
  test('should authentication with credential valid', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadAccountByEmailSpy.email).toBe(authenticationParams.email);
  });

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut();
    jest.spyOn(loadAccountByEmailSpy, 'loadByEmail').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });
});
