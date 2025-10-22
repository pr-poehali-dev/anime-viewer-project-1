import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  userRating: number | null;
  genre: string[];
  episodes: number;
  year: number;
  description: string;
}

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState<Anime[]>([
    {
      id: 1,
      title: 'Токийские мстители',
      image: 'https://v3b.fal.media/files/b/kangaroo/0hjDOu7avljGA59YIGwFj_output.png',
      rating: 4.5,
      userRating: null,
      genre: ['экшн', 'драма'],
      episodes: 24,
      year: 2023,
      description: 'История о группе друзей и их приключениях в современном Токио'
    },
    {
      id: 2,
      title: 'Атака титанов',
      image: 'https://v3b.fal.media/files/b/kangaroo/0hjDOu7avljGA59YIGwFj_output.png',
      rating: 4.8,
      userRating: null,
      genre: ['экшн', 'фантастика'],
      episodes: 75,
      year: 2022,
      description: 'Человечество борется за выживание против гигантских существ'
    },
    {
      id: 3,
      title: 'Моя геройская академия',
      image: 'https://v3b.fal.media/files/b/kangaroo/0hjDOu7avljGA59YIGwFj_output.png',
      rating: 4.3,
      userRating: null,
      genre: ['экшн', 'приключения'],
      episodes: 113,
      year: 2023,
      description: 'Мир, где большинство людей обладают сверхспособностями'
    },
    {
      id: 4,
      title: 'Клинок, рассекающий демонов',
      image: 'https://v3b.fal.media/files/b/kangaroo/0hjDOu7avljGA59YIGwFj_output.png',
      rating: 4.7,
      userRating: null,
      genre: ['экшн', 'фэнтези'],
      episodes: 26,
      year: 2023,
      description: 'Юноша становится охотником на демонов, чтобы спасти сестру'
    },
    {
      id: 5,
      title: 'Наруто',
      image: 'https://v3b.fal.media/files/b/kangaroo/0hjDOu7avljGA59YIGwFj_output.png',
      rating: 4.6,
      userRating: null,
      genre: ['экшн', 'приключения'],
      episodes: 220,
      year: 2022,
      description: 'Юный ниндзя мечтает стать лидером своей деревни'
    },
    {
      id: 6,
      title: 'Ванпанчмен',
      image: 'https://v3b.fal.media/files/b/kangaroo/0hjDOu7avljGA59YIGwFj_output.png',
      rating: 4.4,
      userRating: null,
      genre: ['экшн', 'комедия'],
      episodes: 24,
      year: 2023,
      description: 'Супергерой, который может победить любого врага одним ударом'
    }
  ]);

  const genres = ['all', 'экшн', 'драма', 'фантастика', 'приключения', 'фэнтези', 'комедия'];

  const handleRating = (animeId: number, rating: number) => {
    setAnimeList(prev =>
      prev.map(anime =>
        anime.id === animeId ? { ...anime, userRating: rating } : anime
      )
    );
  };

  const filteredAnime = animeList.filter(anime => {
    const matchesGenre = selectedGenre === 'all' || anime.genre.includes(selectedGenre);
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const renderStars = (animeId: number, currentRating: number | null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(animeId, star)}
            className="transition-all hover:scale-110"
          >
            <Icon
              name={currentRating && star <= currentRating ? 'Star' : 'Star'}
              size={20}
              className={currentRating && star <= currentRating ? 'fill-secondary text-secondary' : 'text-muted-foreground'}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="glass-card border-b sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Play" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">AnimeStream</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                <Icon name="Home" size={20} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                <Icon name="Grid3x3" size={20} className="mr-2" />
                Каталог
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                <Icon name="Heart" size={20} className="mr-2" />
                Избранное
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                <Icon name="User" size={20} className="mr-2" />
                Профиль
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <div className="relative overflow-hidden rounded-3xl glass-card p-12 border-2 border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-4 gradient-text">
                Смотри лучшее аниме
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Тысячи сериалов, фильмов и OVA в высоком качестве. Оценивай и делись с друзьями!
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать просмотр
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  <Icon name="TrendingUp" size={20} className="mr-2" />
                  Популярное
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск аниме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedGenre === genre
                      ? 'bg-gradient-to-r from-primary to-secondary border-0'
                      : 'border-primary/30 hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre === 'all' ? 'Все жанры' : genre}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnime.map((anime, index) => (
              <Card
                key={anime.id}
                className="group glass-card border-primary/20 hover:border-primary/50 transition-all overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      {anime.year}
                    </Badge>
                    <Badge className="bg-secondary/90 backdrop-blur-sm">
                      {anime.episodes} эп.
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Play" size={20} className="mr-2" />
                      Смотреть
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {anime.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {anime.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genre.map((g) => (
                      <Badge key={g} variant="outline" className="text-xs border-primary/30">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size={16} className="text-secondary fill-secondary" />
                      <span className="text-sm font-semibold">{anime.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Ваша оценка:</span>
                      {renderStars(anime.id, anime.userRating)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {filteredAnime.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </main>

      <footer className="glass-card border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 gradient-text">AnimeStream</h4>
              <p className="text-sm text-muted-foreground">
                Лучший сервис для просмотра аниме онлайн
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Навигация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Каталог</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Новинки</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Жанры</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Информация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">О нас</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Контакты</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Правила</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Соцсети</h5>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Icon name="Youtube" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2024 AnimeStream. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
