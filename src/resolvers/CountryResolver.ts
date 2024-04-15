import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Country } from '../entity/Country';

@Resolver(of => Country)
export class CountryResolver {
  // Query pour obtenir tous les pays
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  // Query pour obtenir un pays spécifique par son code
  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOneBy({ code });
  }

  // Mutation pour ajouter un pays avec un code continent (à ajouter dans l'entité)
  @Mutation(() => Country)
  async addCountry(
    @Arg('code') code: string,
    @Arg('name') name: string,
    @Arg('emoji') emoji: string,
    @Arg('continentCode') continentCode: string
  ): Promise<Country> {
    const country = Country.create({ code, name, emoji, continentCode });
    await country.save();
    return country;
  }

  // Query pour obtenir tous les pays d'un continent spécifique
  @Query(() => [Country])
  async countriesByContinent(
    @Arg('continentCode') continentCode: string
  ): Promise<Country[]> {
    return Country.findBy({ continentCode });
  }
}
